import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';
import * as mailer from '../controllers/MailerController';

export default {
  async authenticate(request: Request, response: Response) {
    const { email, password } = request.body;

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOneOrFail({email});

    if(!(await user.compareHash(password).catch((e) => { console.error(e.message) }))){
      return response.status(400).json({ error: "Invalid password" });
    }

    /* verificar se é uma senha temporária e se for senha temporária verifica se ainda é válida */

    if (user.isTemporaryPassword) {
      const now = new Date();
      now.setHours(now.getHours());

      if(user.temporaryPasswordExpires < now){
        return response.status(401).json({ error: "Temporary password expired" });
      }
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

  async changePassword(request: Request, response: Response) {
    const { id, password, newPassword } = request.body;
    const usersRepository = getRepository(User);

    /* Procura o usuario pelo id pois o usuário ja logou com a senha temporária */
    const user = await usersRepository.findOneOrFail(id);
    //if(!user)
    //  return response.status(400).json({ error: "User not found" });
    if((await user.compareHash(password).catch((e) => { console.error(e.message) }))){
      
      /* Altera os dados do User com a nova senha */
      user.password = newPassword;
      user.isTemporaryPassword = false; 

      /* Atualiza o User - Metodo update não foi usado por que não ativa o @BeforeUpdate */
      await usersRepository.save(user);
     
      return response.json(user).status(200).send({ sucess :'Password changed with sucess!'})
    }else{
      return response.status(401).json({ error :'Incorrect password!'})
    }
  },
}