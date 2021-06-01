"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../controller/auth");
const requestreset_1 = require("../../controller/requestreset");
const playlistController_1 = require("../../controller/playlistController"); //Play lists
const profile_1 = require("../../controller/profile");
const usermiddleware_1 = require("../../controller/usermiddleware");
const playlistLike_1 = require("../../controller/playlistLike");
const router = express_1.default.Router();
// route for signIn and signUp
router.post('/music/signUp', auth_1.signUp);
router.post('/music/signIn', auth_1.signIn);
router.put('/likePublicPost/:id', usermiddleware_1.userAuthentication, playlistLike_1.likePublicPost);
// Profile route
router.get('/music/profile/:id', usermiddleware_1.userAuthentication, profile_1.getSingleData);
router.put('/music/profile/:id', usermiddleware_1.userAuthentication, profile_1.updateData);
// routes for password reset request and passowrd reset
router.post('/music/requestReset', requestreset_1.requestReset);
router.post('/music/reset', requestreset_1.reset);
//Routes for playlist
router.get('/playlist/get/:id', usermiddleware_1.userAuthentication, playlistController_1.getPlayList);
router.get('/playlists/', usermiddleware_1.userAuthentication, playlistController_1.getAllPlayLists);
router.post('/playlist/create', usermiddleware_1.userAuthentication, playlistController_1.createPlayList); //Create a playlist -(name must be unique)
router.post('/playlist/addsongs/:id', usermiddleware_1.userAuthentication, playlistController_1.addSongToPlayList); //Add a song to a playlist
router.delete('/playlist/removesong/:id', usermiddleware_1.userAuthentication, playlistController_1.deleteSongFromPlayList); //Delete a song from a playlist
router.delete('/playlist/removeallsongs/:id', usermiddleware_1.userAuthentication, playlistController_1.deleteAllSongsFromPlayList); //Delete all songs from a playlist
router.delete('/playlist/removeplaylist/:id', usermiddleware_1.userAuthentication, playlistController_1.deletePlayList); //Delete a playlist
exports.default = router;
