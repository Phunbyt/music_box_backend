import Joi from 'joi';
import { user } from '../../interfaces/userinterface'

export const validateUser = (user: user) => {
    const Schema = Joi.object({
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        dateOfBirth: Joi.date().required(),
        gender: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    })
    return Schema.validate(user);
}