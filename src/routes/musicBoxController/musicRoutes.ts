import express from 'express';
import { genres, genre } from '../../controller/genres';
import { signUp, signIn } from '../../controller/auth';
import { getSingleData, updateData } from '../../controller/profile';
const router = express.Router();

// Genre routes
router.get('/music/genres', genres)
router.get('/music/genre/:id', genre)

// route for signIn and signUp

router.post('/music/signUp', signUp)
router.post('/music/signIn', signIn)

// Profile route
router.get('/music/profile/:id', getSingleData);
router.put('/music/profile/:id', updateData);

export default router;