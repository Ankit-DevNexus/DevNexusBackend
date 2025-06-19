import dotenv from 'dotenv';
dotenv.config();
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import TeamModel from '../model/TeamModel.js';
// add this controller
export const addTeam = async (req,res) => {
    try {
        const image = req.file?.path;

        if(!image) {
            return res.status(400).json({
                success: false,
                message: "Team image is missing",
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

    const newTeam = new TeamModel({
        image : uploadedImage?.url || "",
    });

    const savedBrand = await newTeam.save();
    res.status(201).json({
        success: true,
        message: "Image Uploaded and Team Saved Successfully",
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


export const getTeam = async (req, res) => {
    try {
        const Teams = await TeamModel.find().sort({ createdAt: -1 }); // Optional: sort by latest
        res.status(200).json({
            success: true,
            message: "Team fetched successfully",
            data: Teams
        });
    } catch (error) {
        console.error("Error fetching team:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching team",
            error: error.message,
        });
    }
};
