"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayListModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const songsSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
}, { timestamps: true });
const playListSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    songs: {
        type: [songsSchema],
    },
    category: {
        type: String,
        required: true,
        enum: ['private', 'public'],
        default: 'private'
    },
    genre: {
        type: String
    },
    likes: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            // type:String,
            required: true,
            ref: 'NewUser'
        }]
}, { timestamps: true });
exports.PlayListModel = mongoose_1.default.model('playlist', playListSchema);
