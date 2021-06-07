import express from 'express';
import { genres, genre } from '../../controller/genres';
import { signUp, signIn } from '../../controller/auth';
import { changePassword } from '../../controller/changePassword';
import { getSingleData, updateData } from '../../controller/profile';
import { userAuthentication } from '../../controller/usermiddleware';
import { likePublicPost } from '../../controller/playlistLike';
import {requestReset,reset} from '../../controller/requestreset';
import { addSongToPlayList, createPlayList, deletePlayList, deleteAllSongsFromPlayList, deleteSongFromPlayList, getAllPlayLists, getPlayList } from '../../controller/playlistController'; //Play lists
import { findAlbum, likeAlbum, listenedToAlbum } from '../../controller/album';
const router = express.Router();

// Genre routes
router.get('/music/genres',userAuthentication, genres);
router.get('/music/genres/:id',userAuthentication, genre);

// route for signIn and signUp
router.post('/music/signUp', signUp);
router.post('/music/signIn', signIn);
router.put('/likePublicPost/:id',userAuthentication,likePublicPost);

// Profile route
router.get('/music/profile/:id', userAuthentication, getSingleData);
router.put('/music/profile/:id', userAuthentication, updateData);

// routes for password reset request and passowrd reset
router.post('/music/requestReset', requestReset);
router.post('/music/reset', reset);


//Routes for playlist
router.get('/playlist/get/:id', userAuthentication, getPlayList);
router.get('/playlists/', userAuthentication, getAllPlayLists);
router.post('/playlist/create', userAuthentication, createPlayList); //Create a playlist -(name must be unique)
router.post('/playlist/addsongs/:id', userAuthentication, addSongToPlayList); //Add a song to a playlist
router.delete('/playlist/removesong/:id',userAuthentication, deleteSongFromPlayList); //Delete a song from a playlist
router.delete('/playlist/removeallsongs/:id', userAuthentication, deleteAllSongsFromPlayList); //Delete all songs from a playlist
router.delete('/playlist/removeplaylist/:id', userAuthentication, deletePlayList); //Delete a playlist

//change password router
router.put('/music/changePassword/:id', userAuthentication, changePassword);

// Album
router.post('/album', userAuthentication, findAlbum);
router.put('/album/like/:id', userAuthentication, likeAlbum);
router.put('/album/listened/:id', userAuthentication, listenedToAlbum);


export default router;
