import jwt from 'jsonwebtoken';
import NewUser from '../schema/registrationSchema';
import Token from '../schema/resetTokenSchema';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import sendEmail from '../utils/sendemail/sendemail';
const bcryptSalt = process.env.BCRYPT_SALT;

async function requestPasswordReset(email: string) {
	console.log(email);
	const user = await NewUser.findOne({ email });
	if (!user) {
		throw new Error('User doesn\'t exist');
	}

	const token = await Token.findOne({ userId: user._id });
	if (token) {
		await token.deleteOne();
	}

	const resetToken = crypto.randomBytes(32).toString('hex');
	const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));

	await new Token({
		userId: user._id,
		token: hash,
		createdAt: Date.now(),
	}).save();

	const link = `${process.env.CLIENT_URL}/passwordreset?token=${resetToken}&id=${user._id}`;
	await sendEmail(
		user.email,
		'Password Reset Request',
		{
			name: `${user.firstName} ${user.lastName}`,
			link: link,
		},
		'../sendemail/template/requestResetPassword.handlebars'
	)
	// eslint-disable-next-line @typescript-eslint/ban-types
		.then((res: {}) => console.log(res))
	// eslint-disable-next-line @typescript-eslint/ban-types
		.catch((err: {}) => console.log(err));

	return link;
}

async function resetPassword(
	userId: string,
	token: string,
	password: string,
	confirmPassword: string
) {
	const passwordResetToken = await Token.findOne({ userId });
	if (!passwordResetToken) {
		throw new Error('Invalid or expired password request token');
	}
	const isValid = await bcrypt.compare(token, passwordResetToken.token);
	if (!isValid) {
		throw new Error('Invalid or expired password request token');
	}

	if (password !== confirmPassword) {
		throw new Error('your new password doesn\'t match');
	}

	const hash = await bcrypt.hash(password, Number(bcryptSalt));

	await NewUser.updateOne(
		{ _id: userId },
		{ $set: { password: hash } },
		{ new: true }
	);

	const user = await NewUser.findById({ _id: userId });

	await sendEmail(
		user.email,
		'Password Reset Successfully',
		{
			name: `${user.firstName} ${user.lastName}`,
		},
		'../sendemail/template/resetPassword.handlebars'
	)
	// eslint-disable-next-line @typescript-eslint/ban-types
		.then((res: {}) => console.log(res))
	// eslint-disable-next-line @typescript-eslint/ban-types
		.catch((err: {}) => console.log(err));

	await passwordResetToken.deleteOne();
	return true;
}

export { requestPasswordReset, resetPassword };
