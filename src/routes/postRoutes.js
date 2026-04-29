import express from 'express';
import {
    addPost,
    updatePost,
} from '../controllers/postController.js';
import { userMiddleware } from '../middleware/userMiddleware.js';

const postRoutes = express.Router();

postRoutes.post('/', userMiddleware, addPost);
postRoutes.put('/:id', userMiddleware, updatePost);

// Dùng để test
// postRoutes.get('/', getPosts);
// postRoutes.get('/middle', userMiddleware, getPosts);
// postRoutes.get('/:id', getPostByID);
//====================================

export default postRoutes;
