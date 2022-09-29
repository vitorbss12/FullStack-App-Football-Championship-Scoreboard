import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import loginValidation from '../middlewares/loginValidation.middleware';
import jsonwebtoken from '../middlewares/jwt.middleware';

const loginRouter = Router();

loginRouter.post(
  '/',
  loginValidation.isLoginBodyValid,
  loginValidation.isLoginValid,
  LoginController.login,
);

loginRouter.get(
  '/validate',
  jsonwebtoken.isTokenValid,
  LoginController.loginValidate,
);

export default loginRouter;
