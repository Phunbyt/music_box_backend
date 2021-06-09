import Joi from 'joi';
export const ValidatePlayList = (obj: Record<string, any>) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        songs: Joi.array(),
        category: Joi.string().required().valid('private', 'public'),
        genre: Joi.string()
    });

	return schema.validate(obj);
};

export const ValidateSong = (obj: Record<string, any>) => {
    const schema = Joi.object({
        songId: Joi.string().required(),
    });
    return schema.validate(obj);
};