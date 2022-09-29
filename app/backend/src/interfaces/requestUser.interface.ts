import { Request } from 'express';
import IUser from './user.interface';

export default interface RequestUser extends Request {
  user?: IUser;
}
