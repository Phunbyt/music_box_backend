import  {Request, Response, } from 'express';
import {PlayListModel,SongModel} from '../schema/playlistsSchema';
import {ValidatePlayList, ValidateSong} from '../utils/validator/playlistValidation';
interface Song{
  _id:string,
  title:string
}

export const getPlayList = async (req: Request, res: Response) => {
    try {
        const playList:any = await PlayListModel.findById(req.params.id);
        if (!playList) {
            return res
                .status(404)
                .json({ message: 'Playlist not found or it may have been deleted' });
        }
        const currentUser: any = req.user ? req.user : null;
        if(playList.category === 'private' && currentUser._id !== playList.owner ){
            res.status(403).json({status:'forbidden', message:'playlist is private'});
        }else if (playList.category === 'public' && currentUser._id !== playList.owner){
            res.status(200).json({ status: 'success', data: playList });
        }else if (playList.category === 'private' && currentUser._id === playList.owner){
            res.status(200).json({ status: 'success', data: playList });
        }
        res.status(200).json({ status: 'success', data: playList });
    } catch (error) {
        res.status(500).send({ message: 'internal server error' });
    }
};

export const getAllPlayLists = async (req:Request, res:Response)=>{
    try{
        const allPlayLists:any = await PlayListModel.find({});
        if(!allPlayLists) return res.status(404).json({status:'error', message:'no playlists'});
        const currentUser: any = req.user ? req.user : null;
        // eslint-disable-next-line prefer-const
        let allLists:Record<string,any>[] = [];
        //allPlayLists.filter((playList:any) => playList.owner === currentUser._id);
        
        
        res.status(200).json({allPlayLists});
    }catch(error){
        res.status(500).send({ message: 'internal server error', 'error':error.message});
    }
};

//Create a new playlist
export const createPlayList = async (req:Request, res:Response)=>{
    try{
        const allPlayLists = await PlayListModel.find({});
        const currentUser:any= req.user ? req.user : null;
        
        let newPlayList:any= new PlayListModel({
            name:req.body.name,
            songs:req.body.songs,
            category:req.body.category,
            genre:req.body.genre
        });
        newPlayList.owner = currentUser._id;
        const exist = allPlayLists.filter(
            (item: any) => item.name === newPlayList.name
        );
        if (exist.length) {
            return res.status(404).json({
                message: 'Playlists name must be unique',
                status: 'error',
            });
        }
        const {error} = ValidatePlayList(req.body);
        if(error){
            return res.status(400).send(error.details[0].message);
        }

        newPlayList = await newPlayList.save();
        res.json({newPlayList, 'status':'success'});
    }catch(error){
        res.send(error.message);
    }
  
};

//Add a song to a playlist
export const addSongToPlayList = async (req:Request, res:Response)=>{
    
    let playList:any = await PlayListModel.findById(req.params.id);
    if(!playList){
        return res.status(404).send('Playlist does not exist');
    }
    const currentUser: any = req.user ? req.user : null;
    if (currentUser._id !== playList.owner && playList.category ==='private') {
        return res.status(403).json({ message: 'access denied', status: 'error' });
    }
    const newSong:any = new SongModel({
        title:req.body.title
    });

    const {error} = ValidateSong(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const exist = playList.songs.filter((item:Song)=>item.title ===newSong.title);
    if(exist.length){
        return res.status(400).send('Cannot add a song twice');
    }
    
    playList.songs.push(newSong);
    playList = await playList.save();

    res.status(201).json({
        message:`Successfully added song to ${playList.name}`,
        data:playList
    });

};

//Delete play list
export const deletePlayList = async (req:Request, res:Response) =>{
    let playList: any = await PlayListModel.findOne({ _id: req.params.id });
    const currentUser: any = req.user ? req.user : null;
    if (currentUser._id !== playList.owner) {
        return res
            .status(403)
            .json({ status: 'forbidden', message: 'access denied' });
    }
    
    
    playList = await PlayListModel.deleteOne({_id:req.params.id});

    res.status(200).json({'message': `Deleted ${playList.name} successfully`, 'status':'success'});
};


export const deleteSongFromPlayList = async (req:Request, res:Response) =>{
    try{
        let playList:any = await PlayListModel.findById(req.params.id);
        if(!playList){
            return res.status(404).send('Playlist does not exist');
        }
        const currentUser: any = req.user ? req.user : null;
        if (currentUser._id !== playList.owner) {
            return res
                .status(403)
                .json({ status: 'forbidden', message: 'access denied' });
        }
        const newSong:any = new SongModel({
            title:req.body.title
        });
        const toDelete:any = playList.songs.filter((item:Song)=>item.title ===newSong.title)[0];
        if(!toDelete)return res.status(404).send('Song doesn\'t exist in the playlist');
        
        
        const idx = playList.songs.indexOf(toDelete);
        playList.songs.splice(idx,1);
        playList = await playList.save();

        res.status(200).json({'message':`Deleted ${newSong.title}`});

    }catch(error){
        res.status(400).send('Error deleting');
    }
};

export const deleteAllSongsFromPlayList = async (req:Request, res:Response) =>{
    try{
        let playList:any = await PlayListModel.findById(req.params.id);
        if(!playList) return res.status(404).send({'message':'playlist doesnt not exist', 'status':'error'});
        const currentUser: any = req.user ? req.user : null;
        if (currentUser._id !== playList.owner) {
            res
                .status(403)
                .json({ status: 'forbidden', message: 'access denied'});
        }
        playList.songs.splice(0);
        playList = await playList.save();
        res.status(200).json({'message':'Deleted all songs in the playlist', 'status':'success'});
    }
    catch(error){
        res.status(500).json({message:error.message, status:'error'});
    }

};