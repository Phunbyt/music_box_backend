import bcrypt from 'bcrypt';

export const comparePassword = async (oldPassword: string, newPassword: string) => {
	const match: boolean = await bcrypt.compare(oldPassword, newPassword);
	if (match) {
		return match;
	} else {
		throw new Error('Password Does Not Match');
	}
};