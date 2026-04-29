import express from 'express';
import {
    addPost,
    updatePost,
    getPostByID,
    getPosts,
} from '../controllers/postController.js';
import { userMiddleware } from '../middleware/userMiddleware.js';

const postRoutes = express.Router();

postRoutes.post('/posts', userMiddleware, addPost);
postRoutes.put('/posts/:id', userMiddleware, updatePost);

// Dùng để test - không cần middleware
postRoutes.get('/get', getPosts);
postRoutes.get('/get/:id', getPostByID);
//====================================

export default postRoutes;
