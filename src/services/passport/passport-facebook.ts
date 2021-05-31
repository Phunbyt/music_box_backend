import { config } from "dotenv";
import passport from "passport";
import strategy from "passport-facebook"

import NewUser from "../../schema/registrationSchema";
import SocialUser from "../../schema/socialSchema"

const { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET } = process.env;
const FacebookStrategy = strategy.Strategy;

config();

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID as string,
      clientSecret: FACEBOOK_CLIENT_SECRET as string,
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      profileFields: ["id", "displayName", "name", "gender", "email"]
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails![0].value;
        let currentUser = await NewUser.findOne({ email: email });
        if (currentUser) {
          return done(null, currentUser, { statusCode: 200 });
        }


        currentUser = await SocialUser.findOne({ email: email });
        if (currentUser) {
          return done(null, currentUser , { statusCode: 200 });
        }

        const userObj = new SocialUser({
          facebookId: profile.id,
          firstName: profile.name!.givenName,
          lastName: profile.name!.familyName,
          email,
        });

        currentUser = await userObj.save();

        return done(null, currentUser, { statusCode: 201 });
      } catch (err) {
        console.log(err);
        done(err, false);
      }
    }
  )
);