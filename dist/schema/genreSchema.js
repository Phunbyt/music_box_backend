"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const genreSchema = new mongoose_1.default.Schema({
    id: { type: Number },
    name: { type: String },
    picture: { type: String },
    picture_small: { type: String },
    picture_medium: { type: String },
    picture_big: { type: String },
    picture_xl: { type: String },
    type: { type: String },
});
const Genre = mongoose_1.default.model('Genre', genreSchema);
exports.default = Genre;
