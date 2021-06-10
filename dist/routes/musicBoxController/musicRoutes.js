"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const genres_1 = require("../../controller/genres");
const auth_1 = require("../../controller/auth");
const changePassword_1 = require("../../controller/changePassword");
const profile_1 = require("../../controller/profile");
const usermiddleware_1 = require("../../controller/usermiddleware");
const playlistLike_1 = require("../../controller/playlistLike");
const search_1 = require("../../controller/search");
const requestreset_1 = require("../../controller/requestreset");
const listenHistory_1 = require("../../controller/listenHistory"); //listeningHistory
const playlistController_1 = require("../../controller/playlistController"); //Play lists
const album_1 = require("../../controller/album");
const genrePlaylist_1 = require("../../controller/genrePlaylist");
const artist_1 = require("../../controller/artist"); //Play lists
const recentlyplayed_1 = require("../../controller/recentlyplayed");
const router = express_1.default.Router();
// Genre routes
router.get('/music/genres', usermiddleware_1.userAuthentication, genres_1.genres);
router.get('/music/genres/:id', usermiddleware_1.userAuthentication, genres_1.genre);
// route for signIn and signUp
router.post('/music/signUp', auth_1.signUp);
router.post('/music/signIn', auth_1.signIn);
router.put('/likePublicPost/:id', usermiddleware_1.userAuthentication, playlistLike_1.likePublicPost);
// routes for SEARCH
router.get('/music/search/', usermiddleware_1.userAuthentication, search_1.search);
// Profile route
router.get('/music/profile/:id', usermiddleware_1.userAuthentication, profile_1.getSingleData);
router.put('/music/profile/:id', usermiddleware_1.userAuthentication, profile_1.updateData);
// routes for password reset request and passowrd reset
router.post('/music/requestReset', requestreset_1.requestReset);
router.post('/music/reset', requestreset_1.reset);
//Routes for artists
router.post('/artist/search', usermiddleware_1.userAuthentication, artist_1.searchArtist);
router.post('/artist/create/:id', usermiddleware_1.userAuthentication, artist_1.createArtist);
router.put('/artist/like/:id', usermiddleware_1.userAuthentication, artist_1.likeArtist);
router.put('/artist/listento/:id', usermiddleware_1.userAuthentication, artist_1.listenedToArtist);
//Routes for playlist
router.get('/playlist/get/:id', usermiddleware_1.userAuthentication, playlistController_1.getPlayList);
router.get('/playlists/', usermiddleware_1.userAuthentication, playlistController_1.getAllPlayLists);
router.post('/playlist/create', usermiddleware_1.userAuthentication, playlistController_1.createPlayList); //Create a playlist -(name must be unique)
router.post('/playlist/addsongs/:id', usermiddleware_1.userAuthentication, playlistController_1.addSongToPlayList); //Add a song to a playlist
router.delete('/playlist/removesong/:id', usermiddleware_1.userAuthentication, playlistController_1.deleteSongFromPlayList); //Delete a song from a playlist
router.delete('/playlist/removeallsongs/:id', usermiddleware_1.userAuthentication, playlistController_1.deleteAllSongsFromPlayList); //Delete all songs from a playlist
router.delete('/playlist/removeplaylist/:id', usermiddleware_1.userAuthentication, playlistController_1.deletePlayList);
router.delete('/playlist/removesong/:id', usermiddleware_1.userAuthentication, playlistController_1.deleteSongFromPlayList); //Delete a song from a playlist
router.delete('/playlist/removeallsongs/:id', usermiddleware_1.userAuthentication, playlistController_1.deleteAllSongsFromPlayList); //Delete all songs from a playlist
router.delete('/playlist/removeplaylist/:id', usermiddleware_1.userAuthentication, playlistController_1.deletePlayList); //Delete a playlist
//Like a playlist
router.post('/listen/song', usermiddleware_1.userAuthentication, playlistController_1.listenToSongInPlayList);
//get most played
router.get('/mostplayed', usermiddleware_1.userAuthentication, playlistController_1.getMostPlayed);
//change password router
router.put('/music/changePassword/:id', usermiddleware_1.userAuthentication, changePassword_1.changePassword);
// get genres playlist and artist
router.get('/genre/playlist/:id', usermiddleware_1.userAuthentication, genrePlaylist_1.getGenrePlaylist);
router.get('/genre/artist/:id', usermiddleware_1.userAuthentication, genrePlaylist_1.getGenreArtist);
// Album
router.post('/album', usermiddleware_1.userAuthentication, album_1.findAlbum);
router.put('/album/like/:id', usermiddleware_1.userAuthentication, album_1.likeAndUnlikeAlbum);
router.put('/album/listened/:id', usermiddleware_1.userAuthentication, album_1.listenedToAlbum);
//Routes for listeningHistory
router.get('/listeninghistory', usermiddleware_1.userAuthentication, listenHistory_1.getListeningHistory);
router.post('/listeninghistory', usermiddleware_1.userAuthentication, listenHistory_1.addTrackToHistory);
router.delete('/listeninghistory/:id', usermiddleware_1.userAuthentication, listenHistory_1.deleteTrackFromHistory);
// routes for recenly played 
router.post('/playlist/saveRecentlyPlayed', usermiddleware_1.userAuthentication, recentlyplayed_1.saveRecentlyPlayed);
router.get('/playlist/getRecentlyPlayed', usermiddleware_1.userAuthentication, recentlyplayed_1.getRecentlyPlayed);
exports.default = router;
