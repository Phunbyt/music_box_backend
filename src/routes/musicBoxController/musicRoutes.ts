import express from 'express';
import { genres, genre } from '../../controller/genres';
import { signUp, signIn } from '../../controller/auth';
import { changePassword } from '../../controller/changePassword';
import { getSingleData, updateData } from '../../controller/profile';
import { userAuthentication } from '../../controller/usermiddleware';
import { likePublicPost } from '../../controller/playlistLike';
import { search } from '../../controller/search';
import {requestReset,reset} from '../../controller/requestreset';
import { getListeningHistory, addTrackToHistory, deleteTrackFromHistory } from '../../controller/listenHistory'; //listeningHistory

import { addSongToPlayList, createPlayList, deletePlayList, deleteAllSongsFromPlayList, deleteSongFromPlayList, getAllPlayLists, getPlayList, listenToSongInPlayList, getMostPlayed} from '../../controller/playlistController'; //Play lists
import { findAlbum, likeAndUnlikeAlbum, listenedToAlbum } from '../../controller/album';
import { getGenrePlaylist, getGenreArtist } from '../../controller/genrePlaylist';
import { createArtist, likeArtist, listenedToArtist, searchArtist } from '../../controller/artist'; //Play lists
import {saveRecentlyPlayed,getRecentlyPlayed} from '../../controller/recentlyplayed';
const router = express.Router();

// Genre routes
router.get('/music/genres', userAuthentication, genres);
router.get('/music/genres/:id', userAuthentication, genre);

// route for signIn and signUp
router.post('/music/signUp', signUp);
router.post('/music/signIn', signIn);
router.put('/likePublicPost/:id', userAuthentication, likePublicPost);

// routes for SEARCH
router.get('/music/search/', userAuthentication, search);

// Profile route
router.get('/music/profile/:id', userAuthentication, getSingleData);
router.put('/music/profile/:id', userAuthentication, updateData);

// routes for password reset request and passowrd reset
router.post('/music/requestReset', requestReset);
router.post('/music/reset', reset);

//Routes for artists
router.post('/artist/search', userAuthentication, searchArtist);
router.post('/artist/create/:id', userAuthentication, createArtist);
router.put('/artist/like/:id', userAuthentication, likeArtist);
router.put('/artist/listento/:id', userAuthentication, listenedToArtist);


//Routes for playlist
router.get('/playlist/get/:id', userAuthentication, getPlayList);
router.get('/playlists/', userAuthentication, getAllPlayLists);
router.post('/playlist/create', userAuthentication, createPlayList); //Create a playlist -(name must be unique)
router.post('/playlist/addsongs/:id', userAuthentication, addSongToPlayList); //Add a song to a playlist
router.delete(
	'/playlist/removesong/:id',
	userAuthentication,
	deleteSongFromPlayList
); //Delete a song from a playlist
router.delete(
	'/playlist/removeallsongs/:id',
	userAuthentication,
	deleteAllSongsFromPlayList
); //Delete all songs from a playlist
router.delete(
	'/playlist/removeplaylist/:id',
	userAuthentication,
	deletePlayList); 
router.delete('/playlist/removesong/:id',
	userAuthentication,
	deleteSongFromPlayList
); //Delete a song from a playlist
router.delete(
	'/playlist/removeallsongs/:id',
	userAuthentication,
	deleteAllSongsFromPlayList
); //Delete all songs from a playlist
router.delete(
	'/playlist/removeplaylist/:id',
	userAuthentication,
	deletePlayList
); //Delete a playlist

//Like a playlist
router.post('/listen/song',userAuthentication, listenToSongInPlayList);
//get most played
router.get('/mostplayed', userAuthentication, getMostPlayed);
//change password router
router.put('/music/changePassword/:id', userAuthentication, changePassword);

// get genres playlist and artist
router.get('/genre/playlist/:id', userAuthentication, getGenrePlaylist);
router.get('/genre/artist/:id', userAuthentication, getGenreArtist);
// Album
router.post('/album', userAuthentication, findAlbum);
router.put('/album/like/:id', userAuthentication, likeAndUnlikeAlbum);
router.put('/album/listened/:id', userAuthentication, listenedToAlbum);


//Routes for listeningHistory
router.get('/listeninghistory', userAuthentication, getListeningHistory);
router.post('/listeninghistory', userAuthentication, addTrackToHistory);
router.delete('/listeninghistory/:id', userAuthentication, deleteTrackFromHistory);



// routes for recenly played 
router.post('/playlist/saveRecentlyPlayed', userAuthentication, saveRecentlyPlayed);

router.get(
	'/playlist/getRecentlyPlayed',
	userAuthentication,
	getRecentlyPlayed
);

export default router;
