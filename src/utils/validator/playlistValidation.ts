import Joi from 'joi';
export const ValidatePlayList = (obj: Record<string, any>) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        songs: Joi.array(),
        category: Joi.string().required().valid('private', 'public'),
        genre: Joi.string(),
        // likes:Joi.array(),
        // likesCount:Joi.number(),
        // listens: Joi.array(),
        // listensCount:Joi.number()
    });

    return schema.validate(obj);
};

export const ValidateSong = (obj: Record<string, any>) => {
    const schema = Joi.object({
        title: Joi.string().required(),
    });
    return schema.validate(obj);
};