import express from 'express';
import { genres, genre } from '../../controller/genres';
import { signUp, signIn } from '../../controller/auth'
const router = express.Router();

// Genre routes
router.get('/music/genres', genres)
router.get('/music/genre/:id', genre)

// route for signIn and signUp

router.post('/music/signUp', signUp)
router.post('/music/signIn', signIn)

export default router;