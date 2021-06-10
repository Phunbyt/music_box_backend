import { Schema, model } from 'mongoose';

interface ListeningHistory {
    trackId: number;
    trackTitle: string;
    trackLink: string;
    trackArtist: string;
    trackalbum: string;
    userID: string
}

const listeningHistorySchema = new Schema<ListeningHistory>({
	trackId: {
		type: Number
	},
	trackTitle: {
		type: String
	},
	trackLink: {
		type: String
	},
	trackArtist: {
		type: String
	},
	trackAlbum: {
		type: String
	},
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'user',
	},
	createdAt: {
		type : Date,
		default: Date.now()
	}, 
	updatedAt: {
		type : Date,
		default: Date.now()
	}
});


const ListeningHistory = model('ListeningHistory', listeningHistorySchema);

export default ListeningHistory;