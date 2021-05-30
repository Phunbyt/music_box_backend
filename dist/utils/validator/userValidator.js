"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = void 0;
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
