import Responses from "../utils/response";
import UserService from "../services/user.service";
import db from "../utils/sequelize";
import JWTHelper from "../utils/jwt";
import { User } from "../models/User";

class UserController {
  async signUp(req: any, res: any) {
    const userRepository = db.sequelize.getRepository(User);
    const userExists = await userRepository.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      Responses.handleError(
        400,
        "User with that email exists. Please login.",
        res
      );
    }
    const user = await UserService.createUser(req.body);
    const token = await JWTHelper.signToken(user);
    const returnData = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      token,
    };
    return Responses.handleSuccess(
      200,
      "User created successfully",
      res,
      returnData
    );
  }
}

export default new UserController();
