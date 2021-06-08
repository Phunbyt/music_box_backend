import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
const mongod = new MongoMemoryServer();

export const testDbConnect = async () => {
 const uri = await mongod.getUri();
 const mongooseOpts = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
 };
 await mongoose.connect(uri, mongooseOpts);
};
export const dbDisconnect = async () => {
 await mongoose.connection.dropDatabase();
 await mongoose.connection.close();
 await mongod.stop();
};
