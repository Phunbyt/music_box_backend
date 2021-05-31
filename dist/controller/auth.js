"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const userValidator_1 = require("../utils/validator/userValidator");
const registrationSchema_1 = __importDefault(require("../models/schema/registrationSchema"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = require("dotenv");
dotenv.config();
async function signUp(req, res, next) {
}
exports.signUp = signUp;
async function signIn(req, res, next) {
    try {
        let { error } = userValidator_1.validateLogin(req.body);
        if (error) {
            return res.status(400).send(error.message);
        }
        let user = await registrationSchema_1.default.findOne({ email: req.body.email });
        if (!user)
            return res.status(400).send('Invalid emaill or password');
        // const validPassword = await bcrypt.compare(req.body.password, user.password)
        // if(!validPassword) return res.status(400).send('Invalid emaill or password');
        const token = jsonwebtoken_1.default.sign({
            email: user.email,
            id: user._id
        }, process.env.JWT_SECRET_KEY, { expiresIn: '3h' });
        res.status(200).json({
            token,
            'status': 'success',
            'user': {
                'firstName': user.firstName,
                'lastName': user.lastName,
                'email': user.email,
                'gender': user.gender,
                '_id': user._id
            }
        });
    }
    catch (error) {
        res.status(500).send({ message: `Error sigining you in` });
    }
}
exports.signIn = signIn;
