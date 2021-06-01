import mongoose from "mongoose";
require("dotenv").config();

let URI: string = process.env.MONGODB_URI as string;
export const connectDB = () => {
  mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connecting to database");
    })
    .catch((err) => console.log(err));
};
