import Joi = require("@hapi/joi");
import { unlinkSync } from "fs";
import Responses from "../utils/response";
import Schemas from "../utils/schemas";
/**
 * Validates the signup or signin routes using the defined schemas
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {void}
 */
const validation = (req: any, res: any, next: any) => {
  const methodsSupported = ["post", "put", "patch"];
  const { path } = req.route;
  const method = req.method.toLowerCase();
  if (methodsSupported.includes(method) && Schemas[path] !== undefined) {
    const schema = Schemas[path];
    const urlParam = Object.keys(req.params)[0];

    const paths = ["/hotels/:hotelId/rooms"];

    if (urlParam !== undefined && paths.includes(path)) {
      req.body[urlParam] = req.params[urlParam];
    }
    // @ts-ignore
    return Joi.validate(req.body, schema, (error: any, data: any) => {
      if (error) {
        const err = error.details.map((e: any) => e.message);
        if (req.file !== undefined) {
          unlinkSync(req.file.path);
        }
        return Responses.handleError(400, err, res);
      }
      req.body = data;
      next();
    });
  }
  return Responses.handleError(405, "Undefined method", res);
};

/**
 * Validates the signup or signin routes using the defined schemas
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {void}
 */
const validateSearch = (req: any, res: any, next: any) => {
  const { path } = req.route;
  const schema = Schemas[path];
  // @ts-ignore
  return Joi.validate(req.query, schema, (error: any, data: any) => {
    if (error) {
      const err = error.details.map((e: any) => e.message);
      return Responses.handleError(400, err, res);
    }
    req.body = data;
    next();
  });
};

export { validation, validateSearch };
