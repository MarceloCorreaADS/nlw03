import { request, Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';
import UsersController from './controllers/UsersController';
import authMiddleware from "./middlewares/auth";

const routes = Router();
const upload = multer(uploadConfig);

/* rotas que não precisam de token */
routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', upload.array('images'),OrphanagesController.create);

/* Rota de autenticação de usuários */
routes.post('/authenticate', UsersController.authenticate);

/* Middleware que faz a verificação do token */
routes.use(authMiddleware);
/* rotas que só são acessadas com token válido */
routes.get('/me/:id', UsersController.me);
routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.show);
routes.post('/users', UsersController.create);

export default routes;