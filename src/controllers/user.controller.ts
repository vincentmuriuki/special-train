import Responses from '../utils/response';
import UserService from '../services/user.service';

class UserController {
    async signUp(req: any, res: any) {
        const userRepository = db.sequelize.getRepository(User);
    const userExists = await userRepository.findOne({ where: { email: req.body.email } })

    if (userExists) {
      Responses.handleError(400, 'User with that email exists. Please login.', res);
    }
    const user = await UserService.createUser(req.body);
    const host = `${req.protocol}://${req.get('host')}`;

    const token = await JWTHelper.signToken(user);
    const returnData = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      token
    };
    }
}