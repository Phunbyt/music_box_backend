import Joi from 'joi';

export const profileJoiVal = Joi.object({
	email: Joi.string().email(),
	firstName: Joi.string(),
	lastName: Joi.string(),
	dateOfBirth: Joi.date(),
	country: Joi.string(),
	gender: Joi.string()
});
