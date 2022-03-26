import { User } from "../models/User";
import hash from "../utils/hash";
import db from "../utils/sequelize";

class UserService {
  /**
   * @param userData
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

export default new UserService();
