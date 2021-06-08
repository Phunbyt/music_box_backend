import Joi from 'joi';

export const validateAlbum = (obj: Record<string, any>) => {
    const schema = Joi.object({
        albumId: Joi.string(),
        likes: Joi.array(),
        likeCount: Joi.number(),
        listeningCount: Joi.number()
    });
    return schema.validate(obj);
}