import dotenv from 'dotenv';
dotenv.config();
import ourTeamModel from "../model/ourTeamModel.js";
import { uploadOnCloudinary } from '../utils/cloudinary.js';

export const addTeamMember = async (req, res) => {
    try {
        const {name, title, technology} = req.body;
        const file = req.file?.path;

        if(!file) {
            return res.status(400).json({
                success: false,
                message:"Avatar (Svg) is required"
            });
        }

        const uploadResult = await uploadOnCloudinary(file);
        if(!uploadResult?.url) {
            return res.status(500).json({success: false, message: "Cloudinary upload failed"});
        }
        const newMember = await ourTeamModel.create({
            avatar: uploadResult.url,
            name,
            title,
            technology
        });
        res.status(201).json({success: true, data: newMember});
    } catch (error) {
        console.error("Error in addTeamMember:", error);
        res.status(500).json({
            success: false,
            message: "Interval Server error while adding team member",
            error: error.message,
        });
    }
};