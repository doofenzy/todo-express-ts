import { Router } from 'express';
import authenticateToken from '../middleware/Auth';
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from '../controller/TodoController';

const router = Router();
router.use(authenticateToken);

router.post('/todo', createTodo);
router.get('/todo', getTodos);
router.delete('/todo/:id', deleteTodo);
router.patch('/todo/:id', updateTodo);

export default router;
