import { Schema, model } from 'mongoose';
import { user } from '../interfaces/userinterface'
import bcrypt from 'bcrypt';

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

userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const NewUser = model("NewUser", userSchema);

export default NewUser;


