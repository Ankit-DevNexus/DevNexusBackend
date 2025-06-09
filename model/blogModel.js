import mongoose from "mongoose";

const BlogsSchema = new mongoose.Schema({
    blogContent: {
        type: String,
        required: true
    },
});

const BlogModel = mongoose.model("Blog", BlogsSchema);
export default BlogModel;