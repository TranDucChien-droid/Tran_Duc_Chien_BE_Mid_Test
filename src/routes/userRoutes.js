import express from 'express';
import {
	findAll,
	loginUser,
	registerUser,
} from '../controllers/userController.js';

const userRoutes = express.Router();

userRoutes.post('/register', registerUser);
userRoutes.post('/login', loginUser);


// Dùng để test
userRoutes.get('/findAllUsers', findAll);
//====================================

export default userRoutes;
