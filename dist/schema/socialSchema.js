"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const socialuserSchema = new mongoose_1.Schema({
    googleId: {
        type: String
    },
    facebookId: {
        type: String
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
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    }
}, {
    timestamps: true
});
const SocialUser = mongoose_1.model("SocialUser", socialuserSchema);
exports.default = SocialUser;
