import { Schema, model } from 'mongoose';

const profileSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
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
const Profile = model('NewUser', profileSchema);

export default Profile;