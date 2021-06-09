"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.requestPasswordReset = void 0;
const registrationSchema_1 = __importDefault(require("../schema/registrationSchema"));
const resetTokenSchema_1 = __importDefault(require("../schema/resetTokenSchema"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const sendemail_1 = __importDefault(require("../utils/sendemail/sendemail"));
const bcryptSalt = process.env.BCRYPT_SALT;
async function requestPasswordReset(email) {
    const user = await registrationSchema_1.default.findOne({ email });
    if (!user) {
        throw new Error('User doesn\'t exist');
    }
    const token = await resetTokenSchema_1.default.findOne({ userId: user._id });
    if (token) {
        await token.deleteOne();
    }
    const resetToken = crypto_1.default.randomBytes(32).toString('hex');
    const hash = await bcryptjs_1.default.hash(resetToken, Number(bcryptSalt));
    await new resetTokenSchema_1.default({
        userId: user._id,
        token: hash,
        createdAt: Date.now(),
    }).save();
    const link = `${process.env.CLIENT_URL}/passwordreset?token=${resetToken}&id=${user._id}`;
    await sendemail_1.default(user.email, 'Password Reset Request', {
        name: `${user.firstName} ${user.lastName}`,
        link: link,
    }, '../sendemail/template/requestResetPassword.handlebars')
        // eslint-disable-next-line @typescript-eslint/ban-types
        .then((res) => console.log(res))
        // eslint-disable-next-line @typescript-eslint/ban-types
        .catch((err) => console.log(err));
    return link;
}
exports.requestPasswordReset = requestPasswordReset;
async function resetPassword(userId, token, password, confirmPassword) {
    const passwordResetToken = await resetTokenSchema_1.default.findOne({ userId });
    if (!passwordResetToken) {
        throw new Error('Invalid or expired password request token');
    }
    const isValid = await bcryptjs_1.default.compare(token, passwordResetToken.token);
    if (!isValid) {
        throw new Error('Invalid or expired password request token');
    }
    if (password !== confirmPassword) {
        throw new Error('your new password doesn\'t match');
    }
    const hash = await bcryptjs_1.default.hash(password, Number(bcryptSalt));
    await registrationSchema_1.default.updateOne({ _id: userId }, { $set: { password: hash } }, { new: true });
    const user = await registrationSchema_1.default.findById({ _id: userId });
    await sendemail_1.default(user.email, 'Password Reset Successfully', {
        name: `${user.firstName} ${user.lastName}`,
    }, '../sendemail/template/resetPassword.handlebars')
        // eslint-disable-next-line @typescript-eslint/ban-types
        .then((res) => console.log(res))
        // eslint-disable-next-line @typescript-eslint/ban-types
        .catch((err) => console.log(err));
    await passwordResetToken.deleteOne();
    return true;
}
exports.resetPassword = resetPassword;
