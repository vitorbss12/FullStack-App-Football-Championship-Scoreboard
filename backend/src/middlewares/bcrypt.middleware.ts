import * as bcrypt from 'bcryptjs';

export default class Bcrypt {
  public static salt = 10;

  // public static encrypt(password: string): string {
  //   return bcrypt.hashSync(password, this.salt);
  // }

  public static compare(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
