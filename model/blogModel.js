import mongoose from "mongoose";


const BlogsSchema = new mongoose.Schema({
    image: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    blogContent: {
        type: String,
        required: true
    },
});

const BlogModel = mongoose.model("Blog", BlogsSchema);
export default BlogModel;