import mongoose from "mongoose";

const BlogsSchema = new mongoose.Schema({
    blogContent: {
        type: String,
        required: true
    }
}, {
    timestamps: true
}
)

const blogModel = mongoose.model("blogModel", BlogsSchema)

export default blogModel;