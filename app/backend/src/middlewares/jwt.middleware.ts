import * as jwt from 'jsonwebtoken';
import IUser from '../interfaces/user.interface';

const secret: string = process.env.JWT_SECRET || 'jwt_secret';

export default class jsonwebtoken {
  public static async generateTokenJWT(user: IUser): Promise<string> {
    const JwtConfig: jwt.SignOptions = {
      expiresIn: '1d',
      algorithm: 'HS256',
    };
    const token = jwt.sign({ data: user }, secret, JwtConfig);

    return token;
  }
}
