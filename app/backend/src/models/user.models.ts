import User from '../database/models/User';
import IUser from '../interfaces/user.interface';

export default class UserModel {
  static async findByEmail(email: string): Promise<IUser | null> {
    const user = await User.findOne({ where: { email } });
    console.log(user);
    return user;
  }
}
