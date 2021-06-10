import mongoose from 'mongoose';
const songsSchema = new mongoose.Schema({
    title: {
        type: String
    },
    songId:{
        type:String,

        
    }, 
    artist:{
        type:String
    },
    album:{
        type:String
    },
    img:{
        type:String
    }
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
   type: String,
  },
 },
 { timestamps: true }
);

export const PlayListModel = mongoose.model('playlist', playListSchema);

