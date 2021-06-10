import { connect, connection } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongoDb = new MongoMemoryServer();

export const testDbConnect = async () => {
	console.log('testDbConnect', ' from testDbConnect');

	const uri = await mongoDb.getUri();
	const monogoDbOptions = {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	};
	await connect(uri, monogoDbOptions, (err: any) => {
		if (err) {
			console.log(err);
		} else {
			console.log('connected');
		}
	});
	//console.log("connection established");
};
export const dbDisconnect = async () => {
	await connection.dropDatabase();
	await connection.close();
	await mongoDb.stop();
};
