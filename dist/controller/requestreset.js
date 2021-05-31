"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reset = exports.requestReset = void 0;
const resetAndRequest_1 = require("../models/resetAndRequest");
async function requestReset(req, res, next) {
    try {
        const user = await resetAndRequest_1.requestPasswordReset(req.body.email);
        res.send("Password request link was sent to your email");
    }
    catch (err) {
        res.status(404).send(err.message);
    }
}
exports.requestReset = requestReset;
async function reset(req, res, next) {
    try {
        const confirmPassword = req.body.confirmPassword;
        const password = req.body.password;
        const token = req.body.token;
        const userId = req.body.userId;
        const user = await resetAndRequest_1.resetPassword(userId, token, password, confirmPassword);
        res.send("Password has been reset successfully");
    }
    catch (err) {
        res.status(404).send(err.message);
    }
}
exports.reset = reset;
