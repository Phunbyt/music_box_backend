import  {Request, Response, } from 'express';
import {PlayListModel,SongModel} from '../schema/playlistsSchema';
import Artist from '../schema/artistSchema';
import Album from '../schema/albumSchema'
import {ValidatePlayList, ValidateSong} from '../utils/validator/playlistValidation';
import axios from 'axios'
interface Song{
  _id:string,
  title:string, 
  album:string,
  songId:string,
  img:string
}

export const getPlayList = async (req: Request, res: Response) => {
    try {
        const currentUser: any = req.user ? req.user : null;
        const playList:any = await PlayListModel.findById(req.params.id);
        if (!playList) {
            return res
                .status(404)
                .json({ message: 'Playlist not found or it may have been deleted' });
        }
        playList.likesCount = playList.likes.length;
        if(playList.category ==='private'){
            if(playList['owner'] == currentUser['_id']){
                res.status(200).json({ status: 'success', data: playList });
            }else{
                res.status(403).json({status:'error', message:'access denied, playlist is private'});
            }
        }
        res.status(200).json({ status: 'success', data: playList });
    } catch (error) {
        res.status(500).send({ message: 'internal server error', status:error.message});
    }
};

export const getAllPlayLists = async (req:Request, res:Response)=>{
    try{
        const currentUser: any = req.user ? req.user : null;
        const query = { owner: currentUser._id  };
        const allPlayLists:any = await PlayListModel.find(query);
        if(!allPlayLists) return res.status(404).json({status:'error', message:'no playlists'});
        res.status(200).json({data:allPlayLists, status:'success'});
    }catch(error){
        res.status(500).send({ message: 'internal server error', 'error':error.message});
    };
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
        res.status(201).json({data:newPlayList, 'status':'success'});
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
    
    const newSong:any = new SongModel({
        songId:req.body.songId
    });
        const { error } = ValidateSong(req.body);

if (error) {
 return res.status(400).send(error.details[0].message);
}
let song: Record<string, any> = {};
try{
    const songRes = await axios.get(`https://api.deezer.com/track/${newSong.songId}`);
     
     song.songId = songRes.data.id;
     song.title = songRes.data.title;
     song.artist = songRes.data.artist.name;
     song.album = songRes.data.album.title;
     song.img = songRes.data.album.cover_medium;
    console.log(song)

}catch(err){
    console.log(err)
}

    const exist = playList.songs.filter((item:Song)=>item.songId ==newSong.songId);
    if(exist.length){
        return res.status(400).send('Cannot add a song twice');
    }
 
    if (playList.category == 'private') {
        if(currentUser._id == playList.owner){
            
             playList.songs.push(song);
             playList = await playList.save();
             return res.status(201).json({
             message: `Successfully added song to ${playList.name}`,
             data: playList,
            });
        }else{
            return res.status(403).json({
                message:'access denied',
                status:'forbidden'
            })
        }
    }else{
         playList.songs.push(song);
         playList = await playList.save();
        return res.status(201).json({
         message: `Successfully added song to ${playList.name}`,
         data: playList,
        });
    }

};


//Listen to a song in a playList
export const listenToSongInPlayList = async (req:Request, res:Response)=>{
    const currentUser: any = req.user ? req.user : null;
    const song:any = await SongModel.findById(req.params.id)
    const playLists:any = await PlayListModel.find()
    // const artist: any = await ArtistModel.find();
    // const album: any = await AlbumModel.find();
    // const exist = playLists.filter((play:any) => play.songs.includes(song));
    playLists.forEach((play:any)=>{
        if(play.songs.includes(song)){
            play.likes.push(currentUser._id)
            play.likesCount = play.likes.length
        }
    })
    res.status(200).json({song})
}
//Like an artist 
export const likeArtist = async (req:Request,res:Response)=>{
    const artist:any = await Artist.findById(req.params.id)
    if (!artist) {
        return res.status(404).send('Artist does not exist');
    }
    const currentUser: any = req.user ? req.user : null;
    artist.likes.push(currentUser._id);
    artist.likesCount = artist.likes.length;
    await artist.save()
    res.status(201).json({artist})
}
//Like an album
export const likeAlbum = async (req:Request,res:Response)=>{
    const album:any = await Album.findById(req.params.id)
    if (!album) {
     return res.status(404).send('Playlist does not exist');
    }
    const currentUser: any = req.user ? req.user : null;
    album.likes.push(currentUser._id);
    album.likesCount = album.likes.length;
    await album.save()
    res.status(201).json({album})

}

export const getMostPlayed = async(req:Request, res:Response) =>{
    const albums:any = await Album.find().sort({'listeningCount':-1}).limit(5)
    const artists:any = await Artist.find().sort({'listeningCount':-1}).limit(5)
    const playlists:any = await PlayListModel.find().sort({'listensCount':-1}).limit(5)

    res.status(200).json({mostPlayedAlbums:albums, mostPlayedArtist:artists, mostPlayedPlaylist:playlists})
}

//Delete play list
export const deletePlayList = async (req:Request, res:Response) =>{
    let playList: any = await PlayListModel.findOne({ _id: req.params.id });
    if(!playList) return res.status(404).json({message:"Not found"})
    const currentUser: any = req.user ? req.user : null;
    if (currentUser._id == playList.owner) {
        playList = await PlayListModel.deleteOne({_id:req.params.id});
        return res.status(200).json({'message': `Deleted ${playList.name} successfully`, 'status':'success'});
    }
    return res
     .status(403)
     .json({ status: "forbidden", message: "access denied" });
    
};


export const deleteSongFromPlayList = async (req:Request, res:Response) =>{
	try{
		let playList:any = await PlayListModel.findById(req.params.id);
		if(!playList){
			return res.status(404).send('Playlist does not exist');
		}
		const currentUser: any = req.user ? req.user : null;
        
        const newSong:any = new SongModel({
            songId:req.body.songId
        });
        const toDelete:any = playList.songs.filter((item:Song)=>item.songId ===newSong.songId)[0];
        if(!toDelete)return res.status(404).send('Song doesn\'t exist in the playlist');
        if(currentUser._id == playList.owner){
            const idx = playList.songs.indexOf(toDelete);
            playList.songs.splice(idx, 1);
            playList = await playList.save();
            res.status(200).json({ message: `Deleted ${newSong.title}` });
        }
        
        return res
        .status(403)
        .json({ status: 'forbidden', message: 'access denied' });
    }catch(error){
        res.status(400).send('Error deleting');
    }
};

export const deleteAllSongsFromPlayList = async (req:Request, res:Response) =>{
    try{
        let playList:any = await PlayListModel.findById(req.params.id);
        if(!playList) return res.status(404).send({'message':'playlist doesnt not exist', 'status':'error'});
        const currentUser: any = req.user ? req.user : null;
        if(currentUser._id == playList.owner){
            playList.songs.splice(0);
            playList = await playList.save();
            return res.status(200).json({ message: 'Deleted all songs' });
        }
        
		return res
			.status(403)
			.json({ status: 'forbidden', message: 'access denied' });
        
    }
    catch(error){
       return res.status(500).json({message:error.message, status:'error'});
    }

};