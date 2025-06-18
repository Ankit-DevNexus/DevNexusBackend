import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'
import blogModel from '../model/blogModel.js';


export const BlogController = async (req, res) => {
    try {
    const { blogContent } = req.body;

    if (!blogContent) {
        return res.status(400).json({ message: 'Blog content is required' });
    }

    const newBlog = new blogModel({
        blogContent: blogContent,
    });

    await newBlog.save();

    res.status(201).json({ message: 'Blog saved successfully!' });
    } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving blog' });
    }
};

export const AllBlogController = async (req, res) =>{
    try {
    const blogs = await blogModel.find().sort({ createdAt: -1}).limit(10);
    res.status(200).json(blogs);

    } catch (error) {
    res.status(500).json({ message: 'Failed to fetch blogs' });
    }
}  


export const BlogImageController = async (req, res) => {
    try {
    const localPath = req.file?.path;
    console.log("localPath", localPath);
    

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(localPath, {
        folder: "blogs"
    });

    // Remove local file after upload
    fs.unlinkSync(localPath);

    res.status(200).json({ url: result.secure_url });
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Image upload failed" });
    }
};

export const EditBlogController = async (req, res) => {
    try {
    const { id } = req.params;
    const updatedBlog = await blogModel.findByIdAndUpdate(id, {
        title: req.body.title,
        content: req.body.content
    }, { new: true })

    res.status(200).json({
        success: true,
        updatedBlog: updatedBlog
    })
    } catch (error) {
    res.status(500).json({
        error: error.message
    })
    }
}