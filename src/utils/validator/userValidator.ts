import Joi from 'joi';
import { user } from '../../interfaces/userinterface';

export const validateLogin = (obj: Record<string, any>) => {
	const schema = Joi.object({
		password: Joi.string()
			.min(3)
			.max(30)
			.required(),
		email: Joi.string().email().required(),
	});
	return schema.validate(obj);
};


export const validateUser = (user: user) => {
	const Schema = Joi.object({
		firstName: Joi.string().min(2).required(),
		lastName: Joi.string().min(2).required(),
		dateOfBirth: Joi.date().required(),
		gender: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().min(6).required(),
		confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
	});
	return Schema.validate(user);
};
