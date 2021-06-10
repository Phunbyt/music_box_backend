"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = void 0;
const changePasswordValidator_1 = require("../utils/validator/changePasswordValidator");
const registrationSchema_1 = __importDefault(require("../schema/registrationSchema"));
const changePassword_1 = require("../utils/helper/changePassword");
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
const changePassword = async (req, res) => {
    const id = req.params.id;
    const { error } = changePasswordValidator_1.changePasswordValidator(req.body);
    if (error)
        return res.status(400).send({ message: error.details[0].message });
    try {
        const user = await registrationSchema_1.default.findOne({ _id: req.params.id });
        if (!user)
            return res.status(404).send({ message: 'User not found' });
        const { oldPassword, newPassword } = req.body;
        const result = await bcrypt_1.default.compare(oldPassword, user['password']);
        const salt = await bcrypt_1.default.genSalt(saltRounds);
        const hash = await bcrypt_1.default.hash(newPassword, salt);
        // i am suppose to compare using bcrypt but password isnt hashed yet.
        if (result) {
            const updatedUser = await changePassword_1.passwordChange(id, hash);
            if (updatedUser) {
                return res
                    .status(200)
                    .send({ message: 'Password Change Successfully' });
            }
            return res.status(400).send({ message: 'Password Change Failed' });
        }
        else {
            return res.status(404).send({ message: 'Check Your Credentials' });
        }
    }
    catch (error) {
        return res.status(400).send({ error: error.message });
    }
};
exports.changePassword = changePassword;
