import { celebrate, Joi, Segments } from "celebrate";

export const userRegistrationValidationMiddleware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string(),
    name: Joi.string().required(),
    mobile: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    status: Joi.number().valid(0, 1).required(),
  }),
});

export const forgetPasswordValidationMiddleware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    userId: Joi.number().required(),
    newPassword: Joi.string().required(),
  }),
});

export const deleteUserValidationMiddleware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    userId: Joi.number().required(),
  }),
});
