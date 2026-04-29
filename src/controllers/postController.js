import postModel from '../models/postModel.js';

export const addPost = async (req, res) => {
    try {
        const { userId, content } = req.body;

        if (!userId || !content) {
            return res.json({ isSuccess: false, message: 'userId and content are required' });
        }

        const timeStamp = Date.now();

        const newPost = new postModel({
            userId,
            content,
            createdAt: timeStamp,
            updatedAt: timeStamp
        });

        const post = await newPost.save();
        res.json({ isSuccess: true, message: 'Post added successfully', data: post });
    } catch (error) {
        res.json({ isSuccess: false, message: error.message });
    }
};

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        const existingPost = await postModel.findById(id);
        if (!existingPost) {
            return res.json({ isSuccess: false, message: 'Post not found' });
        }

        const updatedAt = Date.now();

        const post = await postModel.findByIdAndUpdate(
            id,
            { content, updatedAt },
            { new: true }
        );

        res.json({ isSuccess: true, message: 'Post updated successfully', data: post });
    } catch (error) {
        res.json({ isSuccess: false, message: error.message });
    }
};

export const getPosts = async (req, res) => {
    try {
        const posts = await postModel.find().exec();
        res.json({
            isSuccess: true,
            length: posts.length,
            message: 'Find All Posts Success',
            data: posts,
        });
    } catch (error) {
        console.log('res error', error);
        res.json({ isSuccess: false, message: 'Error' });
    }
};

export const getPostByID = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await postModel.findById(id);

        if (!post) {
            return res.json({ isSuccess: false, message: 'Post not found' });
        }

        res.json({ isSuccess: true, message: 'Post retrieved successfully', data: post });
    } catch (error) {
        res.json({ isSuccess: false, message: error.message });
    }
};

export const removePost = async (req, res) => {
    try {
        const id = req.params.id || req.body.id;
        const post = await postModel.findByIdAndDelete(id);

        if (!post) {
            return res.json({ isSuccess: false, message: 'Post not found' });
        }

        res.json({ isSuccess: true, message: 'Post removed successfully' });
    } catch (error) {
        res.json({ isSuccess: false, message: error.message });
    }
};
