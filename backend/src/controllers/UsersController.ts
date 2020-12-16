import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';
import usersView from '../views/users_view';

import * as Yup from 'yup';


export default {
  async index(request: Request, response: Response) {
    const usersRepository = getRepository(User);

    const users = await usersRepository.find();

    return response.json(usersView.renderMany(users));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOneOrFail(id);

    return response.json(usersView.render(user));
  },

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      password
    } = request.body;

    const usersRepository = getRepository(User);

    const data = {
      name,
      email,
      password
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required().email(),
      password: Yup.string().required(),
    });

    const finalData = schema.cast(data);

    await schema.validate(data, {
      abortEarly: false,
    })

    const user = usersRepository.create(data);

    await usersRepository.save(user);

    return response.status(201).json(usersView.render(user));
  },

  async authenticate(request: Request, response: Response) {
    const { email, password } = request.body;

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOneOrFail({email});

    if(!(await user.compareHash(password).catch((e) => { console.error(e.message) }))){
      return response.status(400).json({ error: "Invalid password" });
    }

    return response.json({
      user,
      token: user.generateToken()
    });
  },

  async me(request: Request, response: Response) {
    try {
      const usersRepository = getRepository(User);  
      const { id } = request.params;
  
      const user = await usersRepository.findOneOrFail(id);
  
      return response.json({ user });
    } catch (err) {
      return response.status(400).json({ error: "Can't get user information" });
    }
  }
};