import { Router } from 'express';
import authenticateToken from '../middleware/Auth';
import { createTodo } from '../controller/TodoController';

const route = Router();
route.use(authenticateToken);

route.post('/todo', createTodo);

export default route;
