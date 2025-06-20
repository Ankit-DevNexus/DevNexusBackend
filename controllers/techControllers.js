import dotenv from 'dotenv';
dotenv.config();
import TechModel from '../model/techModel.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

export const addTech = async (req, res) => {
    try {
        const image = req.file?.path;
        const {name, category} = req.body;

        if(!image || !name || !category) {
            return res.status(400).json({
                success: false,
                message: 'image, name and category are required',
            });
        }

        let uploadedImage;
        try {
            uploadedImage = await uploadOnCloudinary(image);
            console.log("uploadedImage", uploadedImage);
        } catch (error) {
            console.error("Error Uploading image to Cloudinary", error);
            return res.status(500).json({
                success: false,
                message: "Error Uploading Image to Cloudinary",
            });
        }

        const newTech = new TechModel({
            image: uploadedImage.secure_url || "",
            name,
            category
        });
        const savedTech = await newTech.save();

        res.status(201).json({
            success: true,
            message: "Tech Added Successfully",
            data: savedTech,
        });
    } catch (error) {
        console.error("Error Adding Tech", error);
        res.status(500).json({
            success: false,
            message: "Servor Error during upload",
            error: error.message,
        })
    }
};

export const getTechs = async (req, res) => {
    try {
        const {category} = req.query;
        const filter = category ? {category} : {};

        const techs = await TechModel.find(filter).sort({
            createdAt: -1
        });
        res.status(200).json({
            success: true,
            message: "Service fetched successfully",
            data: techs,
        });
    } catch (error) {
        console.error("Error Fetching Techs", error);
        res.status(500).json({
            success: false,
            message: "Server Error while fetching Services",
            error: error.message
        });
    }
};
