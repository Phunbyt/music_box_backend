import express, { Request , Response, NextFunction} from 'express';
import passport from "passport";
import mongoose from 'mongoose'
require ("../../services/passport/passport-google");

import NewUser from '../../schema/registrationSchema'


const authRouter = express.Router()

authRouter.get(
  "/",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);

authRouter.get(
    "/callback",
    passport.authenticate("google", {
      session: false,
  // successRedirect: "/auth/google/callback/dashboard",
     failureRedirect: "/auth/google/callback/failure",
    }),
  async function(req: Request, res: Response) {
    try {
      const token = req.query.code;
    const {user} = req;
    const {email}: any = user!
    const savedUser = await NewUser.findOne({email: email})
    savedUser.token = token
    const result = await savedUser.save()
    console.log('myEmail',email)
    res.send('success');
    } catch (error) {
      console.log(error)
    }
  }
  );

  authRouter.get("/failure", (req: Request, res: Response) => {
    res.status(401).json({
      status: "failed",
      message: "you are not authorized ",
    });
  });


export default authRouter;