"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
let URI = process.env.MONGODB_URI;
const connectDB = () => {
    mongoose_1.default.connect(URI)
        .then(() => { console.log("connecting to database"); }).catch(err => console.log(err));
};
exports.connectDB = connectDB;
