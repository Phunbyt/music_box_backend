import newusers from '../../schema/changePasswordSchema';
export async function passwordChange(userId: string, newPassword: string) {
	console.log('userId', userId);

	const updateUser = await newusers.findByIdAndUpdate(
		userId,
		{ password: newPassword },
		{ new: true },
		function (error, success) {
			if (error) {
				return error;
			}
			return success;
		}
	);
	return updateUser;
}
