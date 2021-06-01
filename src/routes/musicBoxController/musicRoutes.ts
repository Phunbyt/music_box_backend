import express from 'express';
import { signUp, signIn } from '../../controller/auth';
import {
    requestReset,
    reset,
} from '../../controller/requestreset';
import {
    addSongToPlayList,
    createPlayList,
    deletePlayList,
    deleteAllSongsFromPlayList,
    deleteSongFromPlayList,
    getAllPlayLists,
    getPlayList,
} from '../../controller/playlistController'; //Play lists
import { getSingleData, updateData } from '../../controller/profile';
import { userAuthentication } from '../../controller/usermiddleware';
import { likePublicPost } from '../../controller/playlistLike';
const router = express.Router();



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
router.delete(
    '/playlist/removesong/:id',
    userAuthentication, deleteSongFromPlayList
); //Delete a song from a playlist
router.delete('/playlist/removeallsongs/:id', userAuthentication, deleteAllSongsFromPlayList); //Delete all songs from a playlist
router.delete('/playlist/removeplaylist/:id', userAuthentication, deletePlayList); //Delete a playlist


export default router;