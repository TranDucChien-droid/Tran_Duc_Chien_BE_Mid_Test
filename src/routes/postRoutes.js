import express from 'express';
import {
    addPost,
    updatePost,
    getPostByID,
    getPosts,
    removePost,
} from '../controllers/postController.js';
import { adminAuth } from '../middleware/adminAuth.js';

const postRoutes = express.Router();

postRoutes.get('/get', getPosts);
postRoutes.get('/get/:id', getPostByID);
postRoutes.post('/add', adminAuth, addPost);
postRoutes.put('/update/:id', adminAuth, updatePost);
postRoutes.delete('/remove/:id', adminAuth, removePost);

export default postRoutes;
