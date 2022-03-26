import { User } from '../models/User';
import hash from '../utils/hash';
import db from '../utils/sequelize';

export default class UserService {
    /**
   * @param userData - used to create a new user
   * @returns object
   */
  async createUser(data: any): Promise<any> {
    const userRepository = db.sequelize.getRepository(User);
    const passwordHash = hash.generateSync(data.password);

    const userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: passwordHash,
    };
    const user = await userRepository.create(userData);

    return user;
  }
}