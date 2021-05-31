"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const genres_1 = require("../../controller/genres");
const auth_1 = require("../../controller/auth");
const profile_1 = require("../../controller/profile");
const usermiddleware_1 = require("../../controller/usermiddleware");
const playlistLike_1 = require("../../controller/playlistLike");
const router = express_1.default.Router();
// Genre routes
router.get('/music/genres', genres_1.genres);
router.get('/music/genre/:id', genres_1.genre);
// route for signIn and signUp
router.post('/music/signUp', auth_1.signUp);
router.post('/music/signIn', auth_1.signIn);
router.put('/likePublicPost/:id', usermiddleware_1.userAuthentication, playlistLike_1.likePublicPost);
// Profile route
router.get('/music/profile/:id', usermiddleware_1.userAuthentication, profile_1.getSingleData);
router.put('/music/profile/:id', usermiddleware_1.userAuthentication, profile_1.updateData);
exports.default = router;
