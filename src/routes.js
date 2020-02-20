import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import authMiddleware from './app/middleware/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users/store', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users/update', UserController.update);

routes.get('/providers', ProviderController.index);

routes.get('/appoitments', AppointmentController.index);
routes.post('/appoitments', AppointmentController.store);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
