import { Schema, model } from 'mongoose';
import {user} from '../../interfaces/userinterface'
const userSchema = new Schema<user>({
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
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: {
            values: ["male", "female", "non-binary"],
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
        required: true,
        trim: true,
    }
}, {
    timestamps: true
});
const NewUser = model("NewUser", userSchema);
export default NewUser;