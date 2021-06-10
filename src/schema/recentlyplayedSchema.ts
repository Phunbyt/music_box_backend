import { object } from 'joi';
import mongoose,{Schema} from 'mongoose'
import Album from "../schema/albumSchema";
import Artist from "../schema/artistSchema";
interface IRecentlyPlayed {
  userId: string;
 artist: string,
     
    playlist: string,
      
    album: string,
}



const RecentlyPlayedSchema = new Schema<IRecentlyPlayed>(
  {
    userId: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      default: null,
      ref: Artist,
    },
    playlist: {
      type: String,
      default: null,
      ref: "playlist",
    },
    album: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: Album,
    },
  },
  {
    timestamps: true,
  }
);

const RecentlyPlayed = mongoose.model("RecentlyPlayedMedia", RecentlyPlayedSchema);
export default RecentlyPlayed;

