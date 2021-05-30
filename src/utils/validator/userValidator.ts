import Joi from 'joi';

const validateLogin = (obj: Record<string, any>) => {
    const schema = Joi.object({
    password: Joi.string()
      .min(3)
      .max(30)
      .required(),
    email: Joi.string().email().required(),
    })
    return schema.validate(obj)
}

export {validateLogin}