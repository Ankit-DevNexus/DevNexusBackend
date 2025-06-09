import dotenv from 'dotenv';
dotenv.config();
import TestimonalsModel from '../model/testimonialsModel.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';


export const addTestimonials = async (req, res) => {
    try {
        const { description , name, destination } = req.body;
        const file = req.file?.path;

        if(!file) {
            return res.status(400).json({
                success: false,
                message: 'Avatar (Svg) is required'
            });
        }
        const uploadTestimonials = await uploadOnCloudinary(file);
        if(!uploadTestimonials?.url) {
            return res.status(500).json({success: false, message: "Cloudinary upload failed"});
        }

        const testiMonials = await TestimonalsModel.create({
            description,
            avatar: uploadTestimonials.url,
            name,
            destination
        });
        res.status(201).json({success: true, data: testiMonials});
    } catch (error) {
        console.error("Error in addTestimonials", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error while adding",
            error: error.message,
        });
    }
};