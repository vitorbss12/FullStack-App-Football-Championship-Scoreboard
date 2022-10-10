import User from '../database/models/User';
import IUser from '../interfaces/user.interface';

export default class UserModel {
  static async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ where: { email } });
  }
}
