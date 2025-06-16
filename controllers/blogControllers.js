import dotenv from "dotenv";
dotenv.config();
import BlogModel from "../model/blogModel.js";
import fs from 'fs';
import {v2 as cloudinary} from 'cloudinary';


export const BlogController = async (req, res) => {
    try {
        console.log(req.body)
        const image = req.file?.path;
        const { title, blogContent } = req.body;

    if (!image || !title || !blogContent ) {
        return res.status(400).json({ 
            success: false,
            message: 'Tile, Blog content, and image is required' });
    }

    const uploadedImage = await cloudinary.uploader.upload(image, {
        folder: 'blogs'
    });

    fs.unlinkSync(image);

    const newBlog = new BlogModel({
        image: uploadedImage.secure_url,
        title,
        blogContent,
    });

    await newBlog.save();

    res.status(201).json({ 
        success: true,
        message: 'Blog saved successfully!',
        data: newBlog
    });
    } catch (err) {
    console.error("Error Saving Blog", err);
    res.status(500).json({ 
        success: false,
        message: 'Error saving blog',
        error: err.message,
    });
    }
};

export const AllBlogController = async (req, res) =>{
    try {
    const blogs = await BlogModel.find().sort({ createdAt: -1}).limit(10);
    res.status(200).json({
        success: true,
        message: "All Blogs Fetch Successfully",
        data: blogs,
    });

    } catch (error) {
    res.status(500).json({
        success: false,
        message: 'Failed to fetch blogs',
        error: error.message,
    });
    }
};


export const BlogImageController = async (req, res) => {
    try {
    const localPath = req.file?.path;

    if(!localPath) {
        return res.status(400).json({
            success: false,
            message: "No Image File Uploaded",
        });
    }
    

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(localPath, {
        folder: "blogs"
    });

    // Remove local file after upload
    fs.unlinkSync(localPath);

    res.status(200).json({ 
        success: true,
        message: "Image Uploaded Successfully",
        url: result.secure_url,
    });
    } catch (error) {
    console.error("Image Upload Error:",error);
    res.status(500).json({ 
        success: false,
        message: "Image upload failed",
        error: error.message,
    });
    }
};

export const EditBlogController = async (req, res) => {
    try {
    const { id } = req.params;
    const {title, blogContent} = req.body;
    const image = req.file?.path;

    const existingBlog = await BlogModel.findById(id);

    if(!existingBlog) {
        return res.status(404).json({
            success: false,
            message: "Blog Not Found",
        });
    }

    let updatedData = {
        title,
        blogContent,
    };

    if(image) {
        if(existingBlog.imagePublicId) {
            await cloudinary.uploader.destroy(existingBlog.imagePublicId);
        }
    }

    // const updatedBlog = await BlogModel.findByIdAndUpdate(
    //     id, 
    //     {title, blogContent, image},
    //     { new: true }
    // ); 

    const uploadedImage = await cloudinary.uploader.upload(image, {
        folder: 'blogs'
    });

    fs.unlinkSync(image);

    updatedData.image = uploadedImage.secure_url;
    updatedData.imagePublicId = uploadedImage.public_id;

    const updatedBlog = await BlogModel.findByIdAndUpdate(id,updatedData, {new: true});

    // if(!updatedBlog) {
    //     return res.status(404).json({
    //         success: false,
    //         message: "Blog Not Found",
    //     });
    // }

    res.status(200).json({
        success: true,
        message: "Blog Are Updated success",
        data: updatedBlog
    });
    } catch (error) {
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message
    });
    }
};

export const DeleteBlogController = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if blog exists
        const blog = await BlogModel.findById(id);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        // Optional: Delete image from Cloudinary (if you store the `public_id`)
        // Skipping for now, unless you need it.

        if(blog.imagePublicId) {
            await cloudinary.uploader.destroy(blog.imagePublicId);
        }
        await BlogModel.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
        });

    } catch (error) {
        console.error("Delete Blog Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete blog",
            error: error.message,
        });
    }
};