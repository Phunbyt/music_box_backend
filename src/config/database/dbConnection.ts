import mongoose from "mongoose";
require("dotenv").config();

let URI: string = process.env.MONGODB_URI as string;
export const connectDB = () => {
    mongoose.connect(URI)
        .then(() => { console.log("connecting to database")}).catch(err => console.log(err));
};