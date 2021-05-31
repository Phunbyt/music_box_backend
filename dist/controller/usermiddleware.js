"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const registrationSchema_1 = __importDefault(require("../models/schema/registrationSchema"));
dotenv_1.default.config();
const userAuthentication = async (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decodedToken = await jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
            const user = await registrationSchema_1.default.findById({ _id: decodedToken.id });
            if (!user) {
                return res.status(400).json('no token provided');
            }
            else {
                req.user = user;
            }
        }
        catch (err) {
            return res.status(400).json({ 'error': err });
        }
    }
    else {
        return res.status(400).json('not Authorized');
    }
    next();
};
exports.userAuthentication = userAuthentication;
