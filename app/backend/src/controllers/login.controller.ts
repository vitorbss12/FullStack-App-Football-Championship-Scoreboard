import { Response } from 'express';
import RequestUser from '../interfaces/requestUser.interface';
import IUser from '../interfaces/user.interface';
import jsonwebtoken from '../middlewares/jwt.middleware';

export default class LoginController {
  static login = async (req: RequestUser, res: Response) => {
    const { user } = req;

    const token: string = await jsonwebtoken.generateTokenJWT(user as IUser);

    return res.status(200).json({ token });
  };

  static loginValidate = async (req: RequestUser, res: Response) => {
    const { role } = req;

    return res.status(200).json({ role });
  };
}
