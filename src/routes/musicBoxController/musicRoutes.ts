import express from 'express';
import { genres, genre } from '../../controller/genres';
import { signUp, signIn } from '../../controller/auth';
import { changePassword } from '../../controller/changePassword';
const router = express.Router();

// Genre routes
router.get('/music/genres', genres);
router.get('/music/genres/:id', genre);

// route for signIn and signUp

router.post('/music/signUp', signUp);
router.post('/music/signIn', signIn);

//change password router
router.put('/music/changePassword/:id', changePassword);

export default router;
