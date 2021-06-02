import joi from 'joi';

export const changePasswordValidator = (org: {}) => {
	const schema = joi.object({
		oldPassword: joi.string().min(7).required(),
		newPassword: joi.string().min(7).required(),
	});
	return schema.validate(org);
};
