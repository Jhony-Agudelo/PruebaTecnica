import { Router } from 'express';
import auth from './auth';
import user from './user';
import tarea from './tarea';

const routes = Router();

routes.use('/auth', auth);
routes.use('/users', user);
routes.use('/tareas', tarea);

export default routes;
