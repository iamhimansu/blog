import mongoose from "mongoose";

const PostsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: JSON,
        required: true
    }
}, { timestamps: true });

const Post = mongoose.model('Posts', PostsSchema);
export default Post;