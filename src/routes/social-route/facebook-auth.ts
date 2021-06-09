import express, { Request , Response, NextFunction} from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
require ('../../services/passport/passport-facebook');


import NewUser from '../../schema/registrationSchema';

const authRouter = express.Router();

authRouter.get(
	'/',
	passport.authenticate('facebook', {
		session: false,
		scope: 'email',
	})
);

authRouter.get(
	'/callback',
	passport.authenticate('facebook', {
		session: false,
		// successRedirect: "/auth/facebook/callback/dashboard",
		failureRedirect: '/auth/facebook/callback/failure',
	}),
	async function(req: Request, res: Response) {
		try {
			const {user} = req;
			const {email}: any = user!;
			const {_id}: any = user!;
			const savedUser = await NewUser.findOne({email: email});
			const token = jwt.sign({
				email: email,
				id: _id
			}, process.env.JWT_SECRET_KEY!, { expiresIn: '3h' });
			res.header('Authorization', `Bearer: ${token}`);
			res.send('success');
		} catch (error) {
			console.log(error);
		}
	}
);

authRouter.get('/failure', (req: Request, res: Response) => {
	res.status(401).json({
		status: 'failed',
		message: 'you are not authorized ',
	});
});

export default authRouter;