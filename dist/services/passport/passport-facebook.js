"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const passport_1 = __importDefault(require("passport"));
const passport_facebook_1 = __importDefault(require("passport-facebook"));
const registrationSchema_1 = __importDefault(require("../../schema/registrationSchema"));
const { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET } = process.env;
const FacebookStrategy = passport_facebook_1.default.Strategy;
dotenv_1.config();
passport_1.default.use(new FacebookStrategy({
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ["id", "displayName", "name", "gender", "email"]
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log(profile);
        const email = profile.emails[0].value;
        let currentUser = await registrationSchema_1.default.findOne({ email: email });
        if (currentUser) {
            return done(null, currentUser, { statusCode: 200 });
        }
        const userObj = new registrationSchema_1.default({
            facebookId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email,
            password: "1234567"
        });
        currentUser = await userObj.save();
        return done(null, currentUser, { statusCode: 201 });
    }
    catch (err) {
        console.log(err);
        done(err, false);
    }
}));
