import * as JWT from "jsonwebtoken";
import config from "../config";

/**
 * Class tokenizer used to encode and decoded tokens
 */
class tokenizer {
  /**
   *
   * @param {object} user - its an object with users data
   * @returns {string} token
   */
  async signToken(user: any) {
    return JWT.sign(
      {
        email: user.email,
        name: user.firstName,
        userId: user.id,
        verified: user.isVerified,
      },
      config.default.secret,
      { expiresIn: config.default.jwtExpiresIn }
    );
  }

  /**
   *
   * @param {string} token
   * @returns {object} users data decoded from token
   */
  async decodeToken(token: string) {
    const data = JWT.verify(
      token,
      config.default.secret,
      (err: any, decoded: any) => {
        if (err) return { error: err.message };
        return decoded;
      }
    );
    return data;
  }
}

export default new tokenizer();
