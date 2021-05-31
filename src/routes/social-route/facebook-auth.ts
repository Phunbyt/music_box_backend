import express, { Request , Response, NextFunction} from 'express';
import passport from "passport";
require ("../../services/passport/passport-facebook");

const authRouter = express.Router()

authRouter.get(
  "/",
  passport.authenticate("facebook", {
    session: false,
    scope: "email",
  })
);

authRouter.get(
    "/callback",
    passport.authenticate("facebook", {
      session: false,
      // successRedirect: "/auth/facebook/callback/dashboard",
      failureRedirect: "/auth/facebook/callback/failure",
    }),
  function(req: Request, res: Response) {
    res.send('success');
  }
  );

  authRouter.get("/failure", (req: Request, res: Response) => {
    res.status(401).json({
      status: "failed",
      message: "you are not authorized ",
    });
  });

export default authRouter;