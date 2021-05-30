"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const registrationSchema_1 = __importDefault(require("../schema/registrationSchema"));
const userValidator_1 = require("../utils/validator/userValidator");
require("dotenv").config();
async function signUp(req, res, next) {
    try {
        const { firstName, lastName, dateOfBirth, gender, email, password, confirmPassword } = req.body;
        const { error } = userValidator_1.validateUser(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        if (password !== confirmPassword) {
            return res.status(400).send('confirmPassword does not match password');
        }
        const inputEmail = await registrationSchema_1.default.findOne({ email });
        if (inputEmail)
            return res.status(400).send("User already exists");
        const user = await registrationSchema_1.default.create({
            firstName,
            lastName,
            dateOfBirth: new Date(dateOfBirth),
            gender,
            email,
            password
        });
        res.status(201).send("Successfully added user");
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.signUp = signUp;
async function signIn(req, res, next) {
}
exports.signIn = signIn;
