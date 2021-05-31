"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const registrationSchema_1 = __importDefault(require("../../schema/registrationSchema"));
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
dotenv_1.config();
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails[0].value;
        const currentUser = await registrationSchema_1.default.findOne({ email: email });
        if (currentUser) {
            return done(null, currentUser, { statusCode: 200 });
        }
        const userObj = new registrationSchema_1.default({
            googleId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email,
            password: "1234567"
        });
        const user = await userObj.save();
        return done(null, user, { statusCode: 201 });
    }
    catch (err) {
        console.log(err);
        done(err, false);
    }
}));
