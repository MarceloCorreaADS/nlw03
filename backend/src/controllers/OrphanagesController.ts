import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import orphanagesView from '../views/orphanages_view';
import * as Yup from 'yup';
import Image from '../models/Image';

//Schema para validação usado em Create e update
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

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
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
      deletedImages,
    } = request.body;

    const orphanagesRepository = getRepository(Orphanage);
    const imagesRepository = getRepository(Image);

    //Recupero o orfanato para saber qual está sendo atualizado
    const orphanageFromDB = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images']
    });

    // Recupero as imagens enviadas - aqui só irão vir imagens novas
    const requestImages = request.files as Express.Multer.File[];

    //Verifica se há imagens novas
    if (requestImages.length > 0) {
      //Se houver imagens novas faço um loop por todas as imagens
      await Promise.all(requestImages.map(async image => {
        const imageItem = new Image();
        //Recupero o path onde a imagem foi salva pelo Multer
        imageItem.path = image.filename
        //Uso OrphanagefromDb para indicar qual a referencia de orfanato
        imageItem.orphanage = orphanageFromDB;
        //salvo a imagem no banco de dados
        imagesRepository.save(imageItem);
      }));
    }

    //deletedImages um array de IDs de imagens para serem deletadas
    if (deletedImages) {
      imagesRepository.delete(deletedImages);
    }

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      register_approved: register_approved === 'true',
    };

    //valido os dados recebidos
    await schema.validate(data, {
      abortEarly: false,
    })

    await orphanagesRepository.update(id, data);

    return response.status(200).json({ sucess: 'Orphanage updated!' });
  },

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id);

    orphanagesRepository.delete(orphanage);

    return response.status(200).json({ sucess: 'Orphanage deleted!' });
  },

};