import { Router } from 'express';
import { signup, login } from '../controller/AuthController';
import validateSignup from '../middleware/ValidatorSignup';
import validateLogin from '../middleware/ValidatorLogin';
import handleValidationErrors from '../middleware/HandleValidation';

const router = Router();

router.post('/signup', validateSignup, handleValidationErrors, signup);
router.post('/login', validateLogin, handleValidationErrors, login);

export default router;
