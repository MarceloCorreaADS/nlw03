import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import orphanagesView from '../views/orphanages_view';
import * as Yup from 'yup';

export default {
  async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ['images'],
      where: {
        register_approved: true
      }
    });

    return response.json(orphanagesView.renderMany(orphanages));
  },

  async indexPending(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ['images'],
      where: {
        register_approved: false
      }
    });

    return response.json(orphanagesView.renderMany(orphanages));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id,{
      relations: ['images']
    });

    return response.json(orphanagesView.render(orphanage));
  },

  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      register_approved
    } = request.body;

    const orphanagesRepository = getRepository(Orphanage);

    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map(image => {
      return { path: image.filename }
    })

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      register_approved,
      images
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      register_approved: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
        })
      )
    });

    const finalData = schema.cast(data);

    await schema.validate(data, {
      abortEarly: false,
    })

    const orphanage = orphanagesRepository.create(data);

    await orphanagesRepository.save(orphanage);

    return response.status(201).json(orphanage);
  },

  async update(request: Request, response: Response) {
    const {
      id,
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      register_approved,
    } = request.body;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id);

    if(register_approved === false){
      orphanagesRepository.delete(orphanage);

      return response.status(200).json({ sucess : 'Orphanage registration refused and deleted!'});
    }

    //const requestImages = request.files as Express.Multer.File[];

    //const images = requestImages.map(image => {
    //  return { path: image.filename }
    //})

    const data = {
      id,
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      register_approved,
      //images
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      register_approved: Yup.boolean().required(),
      //images: Yup.array(
      //  Yup.object().shape({
      //    path: Yup.string().required()
      //  })
      //)
    });

    await schema.validate(data, {
      abortEarly: false,
    })

    orphanage.name = data.name;
    orphanage.latitude = data.latitude;
    orphanage.longitude = data.longitude;
    orphanage.about = data.about;
    orphanage.instructions = data.instructions;
    orphanage.opening_hours = data.opening_hours;
    orphanage.open_on_weekends = data.open_on_weekends;
    orphanage.register_approved = data.register_approved;
    //orphanage.images = [data.images];

    await orphanagesRepository.save(orphanage);

    return response.status(200).json(orphanage);
  },
};