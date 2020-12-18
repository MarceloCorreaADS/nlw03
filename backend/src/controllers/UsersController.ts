import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';
import usersView from '../views/users_view';
import * as mailer from '../controllers/MailerController';

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
      password,
      isTemporaryPassword: false,
      temporaryPasswordExpires: Date.now()
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

  async forgotPassword(request: Request, response: Response) {
    const { email } = request.body;
    const usersRepository = getRepository(User);

    /* Procura o usuario do email */
    const user = await usersRepository.findOneOrFail({email});
    if(!user)
      return response.status(400).json({ error: "User not found" });

    /* gera uma senha aleatória para ser salva no banco*/
    const temporaryPassword = Math.random().toString(36).substring(2, 10);
    
    /* Definindo hora de expiração da senha */
    const now = new Date();
    now.setHours(now.getHours() + 6);

    /* Altera os dados do User com a nova senha e data de expiração */
    user.password = temporaryPassword;
    user.isTemporaryPassword = true; 
    user.temporaryPasswordExpires = now;

    /* Atualiza o User - Metodo update não foi usado por que não ativa o @BeforeUpdate */
    await usersRepository.save(user);

    /* Recupera o nome do User para enviar no e-mail */
    const name = user.name;

    /* Config do email */
    const emailSeding = {
      from: 'Soporte Neox',
      to: user.email,
      subject: 'Recuperar Senha - Happy',
      template: 'forgotPassword',
      context: { name ,temporaryPassword }
    };
    
    
    mailer.transport.sendMail(emailSeding, (err) => {
      if (err)
        return response.status(400).send({ error: 'Cannot send forgot password email' + err});
      
      return response.status(200).send({ Sucess :'Forgot password email sent with sucess'})
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