import express, { Request , Response, NextFunction} from 'express';
import passport from 'passport';
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
            const token = req.query.code;
            const {user} = req;
            const {email}: any = user!;
            const savedUser = await NewUser.findOne({email: email});
            savedUser.token = token;
            const result = await savedUser.save();
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