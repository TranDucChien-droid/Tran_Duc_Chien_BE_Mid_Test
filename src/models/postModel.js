import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
});

const postModel =
    mongoose.model.post || mongoose.model('post', postSchema);

export default postModel;
