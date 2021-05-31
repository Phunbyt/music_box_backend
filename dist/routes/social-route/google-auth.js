"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
require("../../services/passport/passport-google");
const authRouter = express_1.default.Router();
authRouter.get("/", passport_1.default.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
}));
authRouter.get("/callback", passport_1.default.authenticate("google", {
    session: false,
    // successRedirect: "/auth/google/callback/dashboard",
    failureRedirect: "/auth/google/callback/failure",
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
