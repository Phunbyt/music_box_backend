"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('../../services/passport/passport-facebook');
const registrationSchema_1 = __importDefault(require("../../schema/registrationSchema"));
const authRouter = express_1.default.Router();
authRouter.get('/', passport_1.default.authenticate('facebook', {
    session: false,
    scope: 'email',
}));
authRouter.get('/callback', passport_1.default.authenticate('facebook', {
    session: false,
    failureRedirect: '/auth/facebook/callback/failure',
}), async function (req, res) {
    try {
        const { user } = req;
        const { email } = user;
        const { _id } = user;
        const savedUser = await registrationSchema_1.default.findOne({ email: email });
        const token = jsonwebtoken_1.default.sign({
            email: email,
            id: _id
        }, process.env.JWT_SECRET_KEY, { expiresIn: '3h' });
        res.header('Authorization', `Bearer: ${token}`);
        res.send('success');
    }
    catch (error) {
        console.log(error);
    }
});
authRouter.get('/failure', (req, res) => {
    res.status(401).json({
        status: 'failed',
        message: 'you are not authorized ',
    });
});
exports.default = authRouter;
