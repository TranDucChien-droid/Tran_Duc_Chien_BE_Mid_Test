import express from 'express';
import {
	loginUser,
	registerUser,
} from '../controllers/userController.js';

const userRoutes = express.Router();

userRoutes.post('/register', registerUser);
userRoutes.post('/login', loginUser);

// Dùng để test
// userRoutes.get('/', findAll);
// userRoutes.get('/middle', userMiddleware, findAll);
//====================================

export default userRoutes;
