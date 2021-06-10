
import Joi from 'joi';
export const ValidateMedia = (obj: Record<string, any>) => {
	const schema = Joi.object({
		directory: Joi.string().required().valid('playlist', 'artist', 'album'),
		directoryID: Joi.string().required(),
	});

	return schema.validate(obj);
};
