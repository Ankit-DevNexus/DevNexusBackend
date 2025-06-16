import dotenv from 'dotenv';
dotenv.config();
import ourTeamModel from "../model/ourTeamModel.js";
import { uploadOnCloudinary } from '../utils/cloudinary.js';

export const addTeamMember = async (req, res) => {
    try {
        const {name, title, experience} = req.body;
        let {technology} = req.body;
        const file = req.file?.path;

        if(!file) {
            return res.status(400).json({
                success: false,
                message:"Avatar (Svg) is required"
            });
        }

        if(!technology) {
            return res.status(400).json({
                success: false,
                message: "Technology is required"
            });
        }

        if(!Array.isArray(technology)) {
            technology = [technology];
        }

        const uploadResult = await uploadOnCloudinary(file);
        if(!uploadResult?.url) {
            return res.status(500).json({success: false, message: "Cloudinary upload failed"});
        }
        const newMember = await ourTeamModel.create({
            avatar: uploadResult.url,
            name,
            title,
            experience,
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

export const getTeamMembers = async (req, res) => {
    try {
        const teamMembers = await ourTeamModel.find().sort({ createdAt: -1 }); // latest first
        res.status(200).json({
            success: true,
            message: "Team members fetched successfully",
            data: teamMembers,
        });
    } catch (error) {
        console.error("Error fetching team members:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching team members",
            error: error.message,
        });
    }
};