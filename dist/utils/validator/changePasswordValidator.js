"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const changePasswordValidator = (org) => {
    const schema = joi_1.default.object({
        oldPassword: joi_1.default.string().min(7).required(),
        newPassword: joi_1.default.string().min(7).required(),
    });
    return schema.validate(org);
};
exports.changePasswordValidator = changePasswordValidator;
