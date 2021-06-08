import { Schema, model } from 'mongoose';


const albumSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        id: {
            type: String,
            required: true,
            unique: true
        },
        artist: {
            id: String,
            name: String,
        },
        cover: {
            type: String,
            required: true,
        },
        cover_small: {
            type: String,
            required: true,
        },
        cover_medium: {
            type: String,
            required: true,
        },
        cover_big: {
            type: String,
            required: true,
        },
        cover_xl: {
            type: String,
            required: true,
        },
        genre_id: {
            type: Number,
            required: true,
        },
        duration: {
            type: Number
        },
        nb_tracks: {
            type: Number
        },
        tracklist: {
            type: String,
            required: true
        },
        likes: [
            {
                type: Schema.Types.ObjectId,
                // required: true,
                ref: "NewUser",
            },
        ],
        likeCount: {
            type: Number,
            default: 0
        },
        listeningCount: {
            type: Number,
            default: 0
        },
    },
    { timestamps: true }
);

const Album = model('Album', albumSchema);

export default Album;