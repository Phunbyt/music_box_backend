"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = exports.validateLogin = void 0;
const joi_1 = __importDefault(require("joi"));
const validateLogin = (obj) => {
    const schema = joi_1.default.object({
        password: joi_1.default.string()
            .min(3)
            .max(30)
            .required(),
        email: joi_1.default.string().email().required(),
    });
    return schema.validate(obj);
};
exports.validateLogin = validateLogin;
const validateUser = (user) => {
    const Schema = joi_1.default.object({
        firstName: joi_1.default.string().min(2).required(),
        lastName: joi_1.default.string().min(2).required(),
        dateOfBirth: joi_1.default.date().required(),
        gender: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(6).required(),
        confirmPassword: joi_1.default.string().valid(joi_1.default.ref('password')).required(),
    });
    return Schema.validate(user);
};
exports.validateUser = validateUser;
