import {Request, Response} from 'express';
import axios from 'axios'
import {PlayListModel} from '../schema/playlistsSchema';


export const search = async (req: Request | any,res:Response) => {
    let playlistData : Record<string,any>= {};
    try{

        const searchField = req.query.search

       
        //To get artist from deezer
        const searchArtist = await axios.get(`https://api.deezer.com/search?q=artist:'${searchField}'`);
        
        const searchArtistData = searchArtist.data.data.map((data:Record<string, any>) =>{
            return {
                id: data.artist.id,
                name: data.artist.name,
                picture: data.artist.picture
                
            }
        })

                //To get album from deezer
        const searchAlbum = await axios.get(`https://api.deezer.com/search?q=album:'${searchField}'`);

        const searchAlbumData = searchAlbum.data.data.map((data:Record<string, any>) =>{
            return {
                id: data.album.id,
                title: data.album.title,
                cover: data.album.cover
            }
        })

                //To get playlist from userDB
        const searchPlayList: Record<string, any> | null = await PlayListModel.find({name:{$regex:searchField, $options: '$i'}})
        let searchPublicPlayList: any = searchPlayList.filter((list: {[x:string]: string}) =>{
            return list['category'] = 'public';
        })

        let playListData = searchPublicPlayList.map((data:Record<string, any>) =>{
            return {
                id: data._id,
                name: data.name,
                songs: data.songs,
            }
        })

        if(searchPublicPlayList.length > 0){
            playlistData = {
                message: 'success',
                playlist: playListData
            };
        }else{
             playlistData = {
                 message : "no playlist found from user db",
                 playlist : searchPublicPlayList
             }
            };

            

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
            'status':'failed ',
            'message': err.message
        });
    }
    
    
};