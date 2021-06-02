import mongoose from 'mongoose';

const genreSchema = new mongoose.Schema({
	id: { type: Number },
	name: { type: String },
	picture: { type: String },
	picture_small: { type: String },
	picture_medium: { type: String },
	picture_big: { type: String },
	picture_xl: { type: String },
	type: { type: String },
});

const Genre = mongoose.model('Genre', genreSchema);
export default Genre;
