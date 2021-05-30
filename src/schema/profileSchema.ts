import { Schema, model } from "mongoose";

const profileSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
        trim: true,
    },
    country: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    }
});
const Profile = model("Profile", profileSchema);

export default Profile;