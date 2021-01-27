import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';
import UsersController from './controllers/UsersController';
import AuthsController from './controllers/AuthsController';
import authMiddleware from "./middlewares/auth";

const routes = Router();
const upload = multer(uploadConfig);

/* rotas que não precisam de token */

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', upload.array('images'),OrphanagesController.create);

/* Rota de autenticação sem token*/
routes.post('/authenticate', AuthsController.authenticate);
routes.post('/forgotPassword', AuthsController.forgotPassword);

/* Middleware que faz a verificação do token */


/* rotas que só são acessadas com token válido */

/* Rota de usuários */ 
routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.show);
routes.post('/users', UsersController.create);

/* Rotas de autenticação com token */ 
routes.post('/changePassword', AuthsController.changePassword);

/* Rotas de orfanatos com token */
routes.get('/orphanagesPending', OrphanagesController.indexPending);
routes.post('/orphanagesUpdate', upload.array('images'), OrphanagesController.update);
routes.delete('/orphanages/:id',OrphanagesController.delete);

export default routes;