import express from 'express';
import {
    findAll,
	loginAdmin,
	loginUser,
	registerUser,
} from '../controllers/userController.js';

const userRoutes = express.Router();

userRoutes.get('/findAllUsers', findAll);
userRoutes.post('/register', registerUser);
userRoutes.post('/login', loginUser);
userRoutes.post('/admin/login', loginAdmin);

export default userRoutes;
