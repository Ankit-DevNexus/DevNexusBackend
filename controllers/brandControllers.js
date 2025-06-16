import dotenv from 'dotenv';
dotenv.config();
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import BrandModel from '../model/brandModel.js';

export const addBrand = async (req,res) => {
    try {
        const image = req.file?.path;

        if(!image) {
            return res.status(400).json({
                success: false,
                message: "Brand image is missing",
            });
        }
        let uploadedImage;
        try {
            uploadedImage = await uploadOnCloudinary(image);
            console.log("uploadedImage", uploadedImage);
        } catch(error) {
            console.error("Error uploading image to Cloudinary:", error);
        return res.status(500).json({
            success: false,
            message: "Error uploading image to Cloudinary:",
            error: error.message,
        });
    }

    const newBrand = new BrandModel({
        image : uploadedImage?.url || "",
    });

    const savedBrand = await newBrand.save();
    res.status(201).json({
        success: true,
        message: "Image Uploaded and Brand Saved Successfully",
        data: savedBrand,
    });
    }catch (error) {
    console.error("upload error", error);
        res.status(500).json({
            success: false,
            message: "Server error during upload",
            error: error.message,
        });
    }
};


// Get all brand data
export const getBrands = async (req, res) => {
    try {
        const brands = await BrandModel.find().sort({ createdAt: -1 }); // Optional: sort by latest
        res.status(200).json({
            success: true,
            message: "Brands fetched successfully",
            data: brands
        });
    } catch (error) {
        console.error("Error fetching brands:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching brands",
            error: error.message,
        });
    }
};
