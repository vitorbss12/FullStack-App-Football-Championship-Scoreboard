import UserModel from '../models/user.models';
import IUser from '../interfaces/user.interface';

export default class LoginService {
  static async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findByEmail(email);
  }
}
