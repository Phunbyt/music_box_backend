import mongoose from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
let database : mongoose.Connection;
export const connect = () => {
    // add your own uri below
    const uri = process.env.MONGODB_URI as string;
    if (database) {
        return;
    }
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
    database = mongoose.connection;
    database.once('open', async () => {
        console.log('Connected to database');
    });
    database.on('error', () => {
        console.log('Error connecting to database');
    });
};
export const disconnect = () => {
    if (!database) {
        return;
    }
    mongoose.disconnect();
};
