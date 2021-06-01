import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	password: { type: 'string', required: true }
});

const newusers = mongoose.model('newusers', userSchema);
export default newusers;