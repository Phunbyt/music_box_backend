"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const comparePassword = async (oldPassword, newPassword) => {
    const match = await bcrypt_1.default.compare(oldPassword, newPassword);
    if (match) {
        return match;
    }
    else {
        throw new Error('Password Does Not Match');
    }
};
exports.comparePassword = comparePassword;
