"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const userValidator_1 = require("../utils/validator/userValidator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registrationSchema_1 = __importDefault(require("../schema/registrationSchema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');
dotenv.config();
async function signUp(req, res, next) {
    const { error } = userValidator_1.validateUser(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    try {
        const { firstName, lastName, dateOfBirth, gender, email, password, confirmPassword, } = req.body;
        const inputEmail = await registrationSchema_1.default.findOne({ email });
        if (inputEmail)
            return res.status(400).send('User already exists');
        if (password !== confirmPassword) {
            return res.status(400).send('confirmPassword does not match password');
        }
        const user = await registrationSchema_1.default.create({
            firstName,
            lastName,
            dateOfBirth: new Date(dateOfBirth),
            gender,
            email,
            password,
        });
        res.status(201).json({
            message: 'User Created Successfully',
            user: user,
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.signUp = signUp;
async function signIn(req, res, next) {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-types
        const { error } = userValidator_1.validateLogin(req.body);
        if (error) {
            return res.status(400).send(error.message);
        }
        const user = await registrationSchema_1.default.findOne({ email: req.body.email });
        if (!user)
            return res.status(400).send('Invalid emaill or password');
        const validPassword = await bcrypt_1.default.compare(req.body.password, user.password);
        if (!validPassword)
            return res.status(400).send('Invalid emaill or password');
        const token = jsonwebtoken_1.default.sign({
            email: user.email,
            id: user._id,
        }, process.env.JWT_SECRET_KEY, { expiresIn: '3h' });
        res.status(200).json({
            token,
            status: 'success',
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                gender: user.gender,
                _id: user._id,
            },
        });
    }
    catch (error) {
        res.status(500).send({ message: 'Error sigining you in' });
    }
}
exports.signIn = signIn;
