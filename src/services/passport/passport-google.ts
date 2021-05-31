import { config } from 'dotenv';
import passport from 'passport';
import { Strategy } from 'passport-google-oauth20'

import NewUser from '../../schema/registrationSchema';
import SocialUser from '../../schema/socialSchema'

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

config();

passport.use(
  new Strategy(
    {
      clientID: GOOGLE_CLIENT_ID as string,
      clientSecret: GOOGLE_CLIENT_SECRET as string,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
        const email = profile.emails![0].value;
        const currentUser = await NewUser.findOne({ email: email });
        if (currentUser) {
          return done(null, currentUser, { statusCode: 200 });
        }


        const socialUser = await SocialUser.findOne({email: email});
        if (socialUser) {
          return done(null, socialUser, { statusCode: 200 });
        }

        const userObj = new SocialUser({
          googleId: profile.id,
          firstName: profile.name!.givenName,
          lastName: profile.name!.familyName,
          email,
        });
        const user = await userObj.save();

        return done(null, user, { statusCode: 201 });
      } catch (err) {
        console.log(err);
        done(err, false);
      }
    }
  )
);