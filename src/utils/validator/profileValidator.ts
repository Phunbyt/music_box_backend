import Joi from "joi";

export const profileJoiVal = Joi.object({
  email: Joi.string().email().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  dateOfBirth: Joi.date(),
  country: Joi.string().required(),
  gender: Joi.string().required()
});
