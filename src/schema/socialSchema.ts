import { Schema, model } from 'mongoose';

import express, { Request , Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

interface user {
    googleid?: string;
    facebookid?: string;
    firstName: string;
    lastName: string;
    email: string;
}

const socialuserSchema = new Schema<user>({
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

const SocialUser = model("SocialUser", socialuserSchema);

export default SocialUser;