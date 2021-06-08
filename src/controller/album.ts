import { Request, Response, NextFunction } from 'express';
import Album from '../schema/albumSchema';
import axios from 'axios'


export const findAlbum = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const albumT = req.query.q as string;
        
        let albumData = await Album.findOne({ title: albumT });
        
        if (!albumData) {
            const data = await axios.get(
              `https://api.deezer.com/search/album?q=${albumT}`
            );
            const specificAlbumData = data.data.data
            const output  = specificAlbumData.filter((item:Record<string,any>)=> {
                if(item.title.toLocaleLowerCase() == albumT.toLocaleLowerCase() ){
                    return item;
                }
            });
            
            if(output.length == 0){
                return res.status(400).json({status:'error', message:'Please enter a valid album name'});
            }
            const info = await Album.insertMany(output);
            return res.status(200).json({message:' Data successfully created', info});

        } else {
            return res.status(200).json({ message: 'Data already in the database', albumData });
        };
   
    } catch (error) {
        console.log(error);
    }
};

export const likeAndUnlikeAlbum = async (req: Request | any,res:Response) => {
     try {
       const toLike = await Album.findOne({
         _id: req.params.id,
         likes: { $in: req.user._id },
       }).exec();
         
       if (!toLike) {
         const addedLike = await Album.findOneAndUpdate(
           { _id: req.params.id },
           { $push: { likes: req.user._id } },
           { new: true }
         ).exec();
           addedLike.likeCount = addedLike.likes.length;
           await addedLike.save();
           return res.status(200).json({
             message: 'success',
             data: addedLike,
           });
       } else {
           const removeLike = await Album.findOneAndUpdate(
           { _id: req.params.id },
           { $pull: { likes: req.user._id } },
           { new: true }
         ).exec();
           removeLike.likeCount = removeLike.likes.length;
           await removeLike.save();
         return res.status(200).json({
           status: "Success",
           message: "Successfully unliked Album",
           data: removeLike,
         });
       }
     } catch (err) {
       return res.status(400).json({
         status: 'failed ',
         message: err.message,
       });
     }
};

export const listenedToAlbum = async (req: Request | any, res: Response) => {
    try {
      let count = 1
    const playlist = await Album.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { listeningCount: count } },
      {
        new: true,
      }
    );
    res.status(200).json({
      status: 'Success',
      data: playlist,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error: error.message,
    });
  }
};