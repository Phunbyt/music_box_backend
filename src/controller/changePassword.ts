import { Request, Response } from 'express';
import { changePasswordValidator } from '../utils/validator/changePasswordValidator';
import NewUser from '../schema/registrationSchema';
import { passwordChange } from '../utils/helper/changePassword';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export const changePassword = async (
	req: Request,
	res: Response
): Promise<Response<unknown, Record<string, unknown>>> => {
	const id = req.params.id;

	const { error } = changePasswordValidator(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });

	try {
		const user: Record<any, any> | null = await NewUser.findOne({ _id: req.params.id });
		if (!user) return res.status(404).send({ message: 'User not found' });

		const { oldPassword, newPassword } = req.body;
		const result = await bcrypt.compare(oldPassword, user['password']);

		const salt = await bcrypt.genSalt(saltRounds);
		const hash = await bcrypt.hash(newPassword, salt);
		// i am suppose to compare using bcrypt but password isnt hashed yet.
		if (result) {
			const updatedUser = await passwordChange(id, hash);
			if (updatedUser) {
				return res
					.status(200)
					.send({ message: 'Password Change Successfully' });
			}
			return res.status(400).send({ message: 'Password Change Failed' });
		} else {
			return res.status(404).send({ message: 'Check Your Credentials' });
		}
	} catch (error) {
		return res.status(400).send({ error: error.message });
	}
};
