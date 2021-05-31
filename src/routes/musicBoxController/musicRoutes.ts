import express from 'express';
import { genres, genre } from '../../controller/genres';
import { signUp, signIn } from '../../controller/auth'
import {
  requestReset,
  reset,
} from "../../controller/requestreset";
import { getSingleData, updateData } from '../../controller/profile';
import { userAuthentication } from '../../controller/usermiddleware';
import { likePublicPost } from '../../controller/playlistLike';
const router = express.Router();

// Genre routes
router.get('/music/genres', genres)
router.get('/music/genre/:id', genre)

// route for signIn and signUp

router.post('/music/signUp', signUp)
router.post('/music/signIn', signIn)
router.put('/likePublicPost/:id',userAuthentication,likePublicPost)

// Profile route
router.get('/music/profile/:id', userAuthentication, getSingleData);
router.put('/music/profile/:id', userAuthentication, updateData);

// routes for password reset request and passowrd reset
router.post("/music/requestReset", requestReset);
router.post("/music/reset", reset);

export default router;