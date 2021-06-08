import mongoose from 'mongoose';
const songsSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
}, {timestamps:true});
const playListSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	songs: {
		type: [songsSchema],
	},
	category:{
		type:String,
		required:true,
		enum:['private', 'public'],
		default:'private'
	}, 
	genre:{
		type:String
	},
	likes:[{
		type: mongoose.Schema.Types.ObjectId,
		// type:String,
		required:true,
		ref: 'NewUser'
	}],
	owner:{
		type:String
	}
},{timestamps:true});

export const PlayListModel = mongoose.model('playlist', playListSchema);
export const SongModel = mongoose.model('song', songsSchema);