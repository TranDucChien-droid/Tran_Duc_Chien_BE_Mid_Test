import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Number, required: true },
    updatedAt: { type: Number, required: true },
});

const postModel =
    mongoose.model.post || mongoose.model('post', postSchema);

export default postModel;
