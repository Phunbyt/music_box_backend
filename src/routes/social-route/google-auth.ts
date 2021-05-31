import express, { Request , Response, NextFunction} from 'express';
import passport from "passport";
require ("../../services/passport/passport-google");


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
  function(req: Request, res: Response) {
    res.send('success');
  },
  );

  authRouter.get("/failure", (req: Request, res: Response) => {
    res.status(401).json({
      status: "failed",
      message: "you are not authorized ",
    });
  });


export default authRouter;