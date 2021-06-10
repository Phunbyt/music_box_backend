import Artist from '../schema/artistSchema';
import { NextFunction, Request, Response } from 'express';
import axios from 'axios'

export async function searchArtist(req: Request, res: Response, next: NextFunction) {
    try {
        const artistName = req.query.q;
        function escapeRegex(text: any) {
            return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        }
        const regex = new RegExp(escapeRegex(artistName), 'gi');
        const artistsName = await Artist.findOne({ artistName: regex }).exec();

        if (!artistsName) {
            const artistsInfo = await axios.get(`https://api.deezer.com/search/artist?q=${artistName}`);
            const infos = artistsInfo.data.data;
            let result = [];
            for (let i = 0; i < infos.length; i++){
                result.push({name: infos[i].name, id:infos[i].id })
            }
            return res.status(201).json(result)
        }
        res.status(201).send(artistsName);
    } catch (error) {
        res.status(500).json('An error occurred');
    }
}
export async function createArtist(req: Request, res: Response, next: NextFunction){
    try {
        const { id } = req.params
        const artist = await Artist.findOne({artistId: id})
        if (!artist) {
            const { data: info } = await axios.get(`https://api.deezer.com/artist/${id}`);
            const artist = await Artist.create({
                artistName : info.name,
                artistId: info.id,
                artistLink: info.link,
                artistPicture: info.picture,
                pictureSmall: info.picture_small,
                pictureMedium: info.picture_medium,
                pictureBig: info.picture_big,
                pictureXl: info.picture_xl,
                noOfAlbums: info.nb_album,
                noOfFan: info.nb_fan,
                radio: info.radio,
                trackList: info.tracklist,
                type: info.type,
            })
            return res.status(201).send(artist);
        }
        return res.status(201).json(artist);
        
    }
    catch ({message}) {
        res.status(500).json(message)
    }
}

export async function likeArtist(req: Request | any, res: Response) {
    try {
        const liked = await Artist.findOne({
            _id: req.params.id,
            likes: { $in: req.user._id }
        }).exec();

        if (!liked) {
            const addLike = await Artist.findOneAndUpdate(
                {_id: req.params.id},
                { $push: { likes: req.user._id } },
                {new: true}
            ).exec();
            addLike.likeCount = addLike.likes.length;
            await addLike.save()
            return res.status(200).json({
                'message': 'success',
                'info': addLike
            })
            } else {
                const removeLike = await Artist.findOneAndUpdate(
                    { _id: req.params.id },
                    { $pull: { likes: req.user._id } },
                    { new: true }
                    ).exec();
                    removeLike.likeCount = removeLike.likes.length;
                    await removeLike.save();
                    return res.status(200).json({
                    status: "Success",
                    message: "Successfully unliked Album",
                });
            }
    }
    catch (error) {
        return res.status(400).json({
            'status': 'failed',
            'message': error.message
        });
    }
}

export async function listenedToArtist(req: Request | any, res: Response) {
    try {
        let count = 1 // used to track the amount of listeningTo an artist has.
        const artist = await Artist.findOneAndUpdate(
            { _id: req.params.id },
            { $inc: { listeningCount: count } },
            {new: true}
        );
        res.status(200).json({
            status: "Success",
            artistInfo: artist,
        });
    }
    catch (error) {
        res.status(400).json({
        status: "fail",
        error: error.message,
        });
    }
}
