"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    googleId: {
        type: String,
        trim: true
    },
    facebookId: {
        type: String,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    dateOfBirth: {
        type: Date,
    },
    country: String,
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'non-binary'],
            message: '{VALUE} is not a gender',
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        trim: true,
    }
}, {
    timestamps: true
});
userSchema.pre('save', async function (next) {
    const salt = await bcrypt_1.default.genSalt(10);
    this.password = await bcrypt_1.default.hash(this.password, salt);
    next();
});
const NewUser = mongoose_1.model('NewUser', userSchema);
exports.default = NewUser;
