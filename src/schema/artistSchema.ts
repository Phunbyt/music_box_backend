import { Schema, model } from 'mongoose';
import { artist } from '../interfaces/artistinterface';
const artistSchema = new Schema<artist>({
    artistName: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    artistId: {
        type: String,
        required: true,
    },
    artistLink: {
        type: String,
        required: true
    },
    artistPicture: {
        type: String,
        required: true,
    },
    pictureSmall: {
        type: String,
        required: true,
    },
    pictureMedium: {
        type: String,
        required: true,
    },
    pictureBig: {
        type: String,
        required: true,
    },
    pictureXl: {
        type: String,
        required: true,
    },
    noOfAlbums: {
        type: Number,
        required: true,
    },
    noOfFan: {
        type: Number,
        required: true,
    },
    radio: {
        type: Boolean,
        required: true,
    },
    trackList: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'NewUser',
        }
    ],
    listened: [
        {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'NewUser',
        }
    ],
    likeCount: {
        type: Number,
        default: 0
    },
    listeningCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
})

const Artist = model('Artist', artistSchema)

export default Artist;
// first check db, if null, fetch from  deezer, create, if null, not existing.