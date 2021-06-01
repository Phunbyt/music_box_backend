"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordChange = void 0;
const changePasswordSchema_1 = __importDefault(require("../../schema/changePasswordSchema"));
async function passwordChange(userId, newPassword) {
    console.log('userId', userId);
    const updateUser = await changePasswordSchema_1.default.findByIdAndUpdate(userId, { password: newPassword }, { new: true }, function (error, success) {
        if (error) {
            return error;
        }
        return success;
    });
    return updateUser;
}
exports.passwordChange = passwordChange;
