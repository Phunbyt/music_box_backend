import mongoose from 'mongoose';
const songsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
}, {timestamps:true});
export const SongModel = mongoose.model('song', songsSchema);

const playListSchema = new mongoose.Schema(
 {
  name: {
   type: String,
   required: true,
  },
  songs: {
   type: [songsSchema],
  },
  category: {
   type: String,
   required: true,
   enum: ["private", "public"],
   default: "private",
  },
  genre: {
   type: String,
  },
  likes: [
   {
    type: mongoose.Schema.Types.ObjectId,
    // type:String,
    required: true,
    ref: "NewUser",
   },
  ],
  listens: [
   {
    type: String,
   },
  ],
  likesCount: {
   type: Number,
   default: 0,
  },
  listensCount: {
   type: Number,
   default: 0,
  },
  owner: {
   type: mongoose.Schema.Types.ObjectId,
  },
 },
 { timestamps: true }
);

export const PlayListModel = mongoose.model('playlist', playListSchema);

const artistSchema = new mongoose.Schema({
    name:String,
    artistId: String,
    listensCount:Number

})
const albumSchema = new mongoose.Schema({
    name:String, 
    albumId:String,
    listensCount:Number
})

export const AlbumModel = mongoose.model('Album', albumSchema)
export const ArtistModel = mongoose.model('Artist', artistSchema)