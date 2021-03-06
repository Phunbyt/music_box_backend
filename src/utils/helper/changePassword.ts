import NewUser from '../../schema/registrationSchema';
export async function passwordChange(userId: string, newPassword: string) {

	const updateUser = await NewUser.findByIdAndUpdate(
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
