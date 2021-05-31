"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
require("../../services/passport/passport-facebook");
const authRouter = express_1.default.Router();
authRouter.get("/", passport_1.default.authenticate("facebook", {
    session: false,
    scope: "email",
}));
authRouter.get("/callback", passport_1.default.authenticate("facebook", {
    session: false,
    // successRedirect: "/auth/facebook/callback/dashboard",
    failureRedirect: "/auth/facebook/callback/failure",
}), function (req, res) {
    res.send('success');
});
authRouter.get("/failure", (req, res) => {
    res.status(401).json({
        status: "failed",
        message: "you are not authorized ",
    });
});
exports.default = authRouter;
