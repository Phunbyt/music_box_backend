
import express, { Request, Response, NextFunction } from 'express';
import { requestPasswordReset, resetPassword } from '../models/resetAndRequest';

export async function requestReset(req: Request, res: Response, next: NextFunction) {
	try {
		const user = await requestPasswordReset(req.body.email);
		res.send('Password request link was sent to your email');

	} catch (err) {
		res.status(404).send(err.message);
	}

}
  
export async function reset(req: Request, res: Response, next: NextFunction) {
	try {

		const confirmPassword = req.body.confirmPassword;
		const password = req.body.password;
		const token = req.body.token;
		const userId = req.body.userId;
		const user = await resetPassword(
			userId,
			token,
			password,
			confirmPassword
		);
		res.send('Password has been reset successfully');
	} catch (err) {
		res.status(404).send(err.message);
	}
}