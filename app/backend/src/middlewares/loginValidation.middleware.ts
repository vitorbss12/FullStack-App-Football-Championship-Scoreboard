import { Request, Response, NextFunction } from 'express';
import RequestUser from '../interfaces/requestUser.interface';
import LoginService from '../services/login.service';
import HttpException from '../shared/http.exception';
import loginSchema from './schemas/login.schema';
import Bcrypt from './bcrypt.middleware';

export default class loginValidation {
  static isLoginBodyValid = async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const { email, password } = req.body;
    const { error } = loginSchema.validate({ email, password });

    if (error) {
      const [errorCode, errorMessage] = error.details[0].message.split('|');
      throw new HttpException(Number(errorCode), errorMessage);
    }

    return next();
  };

  static isLoginValid = async (
    req: RequestUser,
    _res: Response,
    next: NextFunction,
  ) => {
    const { email, password } = req.body;
    const user = await LoginService.findByEmail(email);

    if (!user || !Bcrypt.compare(password, user.password)) {
      throw new HttpException(401, 'Username or password invalid');
    }

    req.user = user;
    return next();
  };
}
