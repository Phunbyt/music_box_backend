import {Request, Response} from 'express';
import axios from 'axios'
import {PlayListModel, SongModel} from '../schema/playlistsSchema';


export const search = async (req: Request | any,res:Response) => {
    let playlistData : Record<string,any>= {};
    try{

        const searchField = req.query.search

       
        //To get artist from deezer
        const searchArtist = await axios.get(`https://api.deezer.com/search/artist?q=${searchField}`);
        
        const searchArtistData = searchArtist.data.data.map((data:Record<string, any>) =>{
            return {
                id: data.id,
                name: data.name,
                picture: data.picture
                
            }
        })

                //To get album from deezer
        const searchAlbum = await axios.get(`https://api.deezer.com/search/album?q=${searchField}`);

        const searchAlbumData = searchAlbum.data.data.map((data:Record<string, any>) =>{
            return {
                id: data.id,
                title: data.title,
                cover: data.cover
            }
        })

                //To get playlist from userDB
        const lists:Record<string, any> =[];
        const searchPlayList: Record<string, any>  = await PlayListModel.find({'songs.title':{$regex:`.*${searchField}.*`, $options: '$i'}})
        let searchPublicPlayList: any = searchPlayList.filter((list: {[x:string]: string}) =>{
            return list['category'] = 'public';
        })
        //console.log(searchPublicPlayList)
        let playListData = searchPublicPlayList.map((item:Record<string, any>) =>{
           return item.songs
        })

        playListData.forEach((song:Record<string, any>)=>song.forEach((el:Record<string, any>)=> lists.push({
            _id: el._id,
            title: el.title,
            artist: el.artist,
            album: el.album,
            img: el.img
        })))

        if(searchPublicPlayList.length > 0){
            playlistData = {
                message: 'success',
                playlist: lists
            };
        }else{
             playlistData = {
                 message : "no songs in the  playlist found from user db",
                 playlist : searchPublicPlayList
             }
            };

            
            // console.log(lists)
        return res.status(200).json({
            'message': 'success',
            'data': {
                artist: searchArtistData,
                album: searchAlbumData,
                playList: playlistData,
            }
        });
                
    }catch(err){
        return res.status(400).json({
            'status':'SEARCH failed ',
            'message': err.message
        });
    }
    
    
};