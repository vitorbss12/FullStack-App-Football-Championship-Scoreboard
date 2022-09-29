import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import loginValidation from '../middlewares/loginValidation.middleware';

const loginRouter = Router();

loginRouter.post(
  '/',
  loginValidation.isLoginBodyValid,
  loginValidation.isLoginValid,
  LoginController.login,
);

export default loginRouter;
