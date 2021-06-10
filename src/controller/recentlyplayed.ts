import express, { Request, Response, NextFunction } from "express";
import RecentlyPlayed from '../schema/recentlyplayedSchema'
import {verifyMedia} from "../models/recentlyPlayedModel";



export async function saveRecentlyPlayed(
  req: Request,
  res: Response,
  next: NextFunction
) {
   const user: any = req.user;
   const userId = user._id;
    const {  directory, directoryID} = req.body
    try {
      const newMedia = await verifyMedia(directory, directoryID);
      newMedia.userId = userId;
      const foundUser = await RecentlyPlayed.findOne({ userId });
        if (!foundUser) {
            const media = await new RecentlyPlayed(newMedia);
            media[directory] = directoryID;
           const savedMedia = await media.save();
      return res.status(201).send(savedMedia);
            
        }
         
              foundUser[directory] = directoryID;
        
        await foundUser.save();
           const savedMedia = await foundUser.save();


      res.status(201).send(savedMedia);
    } catch (err) {
      console.log(err.message)
        res.status(400).send(err.message)
      }
}


export async function getRecentlyPlayed(
  req: Request,
  res: Response,
  next: NextFunction
) {
    const user: any = req.user;
    
    try {
        const playlist = await RecentlyPlayed.find({ userId: user._id }).populate({
      path: "playlist",
    });

    const album = await RecentlyPlayed.find({ userId: user._id })
        .populate("album")
    
    const artist = await RecentlyPlayed.find({ userId: user._id }).populate("artist");

    const recentlyPlayed = {
      playlist: playlist,
      albums: album,
      artist: artist,
    };


        res.send(recentlyPlayed);
    } catch (err) {
        res.status(400).send(err)
    }
}