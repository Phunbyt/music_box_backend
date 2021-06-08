import {Request, Response} from 'express';
import ListeningHistory from '../schema/listeningHistorySchema';

require('dotenv').config();


const getListeningHistory = async (req: Request, res: Response) => {
	try {
		const currentUser: Record<string, any> | undefined = req.user;
        console.log(currentUser)
		const query: Record<string, any> | undefined = { userId: currentUser!._id  };
		const allListeningHistory = await ListeningHistory.find(query);
		if(!allListeningHistory) return res.status(404).json({status:'error', message:'no listening history'});
		res.status(200).json({message: 'success',data: allListeningHistory});

	} catch (error) {
		res.status(500).send({ message: 'internal server error', status:error.message});
	}
};

const addTrackToHistory = async (req: Request, res: Response) => {
	try {
		const {trackId, trackTitle, trackLink, trackArtist, trackAlbum} = await req.body;
		const currentUser: Record<string, any> | undefined = req.user;
		const savedTrack: Record<string, any> | undefined = await ListeningHistory.findOne({trackId: trackId, userId: currentUser!._id});
		if (savedTrack) {
			savedTrack.updatedAt = Date.now();
			const result = await savedTrack.save();
			return res.status(201).json({'message':'success', data: result});
		}
		const listeningHistory = new ListeningHistory({
			trackId: Number(trackId),
			trackTitle,
			trackLink,
			trackArtist,
			trackAlbum,
			userId: currentUser!._id
		});

		const result = await listeningHistory.save();
		res.status(201).json({'message':'success', data: result});
        
	} catch (error) {
		res.status(500).send({ message: 'internal server error', status:error.message});
	}
};

const deleteTrackFromHistory = async (req: Request, res: Response) => {
	try {
		const trackId = await req.params.id; 

		const currentUser: Record<string, any> | undefined = req.user;
		const query = { userId: currentUser!._id, trackId: Number(trackId) };

		const allListeningHistory = await ListeningHistory.findOneAndRemove(query);
		if(!allListeningHistory) return res.status(404).json({status:'error', message:'user does not have the given track in his listening history'});
		res.status(200).json({message: 'success', data: 'track deleted'});

	} catch (error) {
		res.status(500).send({ message: 'internal server error', status:error.message});
	}
};

export { getListeningHistory, addTrackToHistory, deleteTrackFromHistory };
