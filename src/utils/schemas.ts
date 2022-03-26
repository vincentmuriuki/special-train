import * as Joi from "@hapi/joi";

export const schemaErrorMessage = (message: any) => () => message;

const signupSchema = Joi.object()
  .keys({
    firstName: Joi.string().strict().trim(),
    lastName: Joi.string().strict().trim(),
    email: Joi.string().strict().trim().email().required(),
    password: Joi.string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
      .min(8)
      .required(),
  })
  .options({
    abortEarly: false,
  });

const schema: Record<string, any> = {
  "/auth/signup": signupSchema,
};

export default schema;
