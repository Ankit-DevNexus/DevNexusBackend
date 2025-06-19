import dotenv from 'dotenv';
dotenv.config();
import TestimonalsModel from '../model/testimonialsModel.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';


export const addTestimonials = async (req, res) => {
    try {
        const { description , name, destination, star } = req.body || {};
        const file = req.file?.path;

        console.log("Body", req.body);
        console.log("FILE", req.file);


        if(!file) {
            return res.status(400).json({
                success: false,
                message: 'Avatar (Svg) is required'
            });
        }

        if(!star || isNaN(star) || star < 1 || star > 5) {
            return res.status(400).json({
                success: false,
                message: 'Star must be between 1 and 5'
            });
        };

        const uploadTestimonials = await uploadOnCloudinary(file);
        if(!uploadTestimonials?.url) {
            return res.status(500).json({success: false, message: "Cloudinary upload failed"});
        }

        const testiMonials = await TestimonalsModel.create({
            description,
            avatar: uploadTestimonials.url,
            name,
            destination,
            star
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

export const getTestimonials = async (req, res) => {
    try {
        const testimonials = await TestimonalsModel.find().sort({ createdAt: -1 }); // latest first
        res.status(200).json({
            success: true,
            message: "Testimonials fetched successfully",
            data: testimonials,
        });
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching testimonials",
            error: error.message,
        });
    }
};