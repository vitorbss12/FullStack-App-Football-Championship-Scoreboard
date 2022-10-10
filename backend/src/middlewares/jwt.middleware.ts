import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import RequestUser from '../interfaces/requestUser.interface';
// import LoginService from 'src/services/login.service';
import HttpException from '../shared/http.exception';
import IUser from '../interfaces/user.interface';
import IDecoded from '../interfaces/decoded.interface';

const secret: string = process.env.JWT_SECRET || 'jwt_secret';

export default class jsonwebtoken {
  static decoded: IDecoded;

  public static async generateTokenJWT(user: IUser): Promise<string> {
    const JwtConfig: jwt.SignOptions = {
      expiresIn: '1d',
      algorithm: 'HS256',
    };
    const token = jwt.sign({ data: user }, secret, JwtConfig);

    return token;
  }

  static isTokenValid = async (
    req: RequestUser,
    _res: Response,
    next: NextFunction,
  ) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new HttpException(401, 'Token not provided');
    }

    this.decoded = jwt.verify(token, secret) as IDecoded;

    req.role = this.decoded.data.role;
    return next();
  };
}
