import UIUXDesignModel from '../model/UIUXDesignTechnologies.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js'; // Adjust path as needed

// POST - Add UI/UX Design Entry
export const AddUIUXDesignController = async (req, res) => {
    try {
        const { UIUXTitle, UIUXDescription } = req.body;
        const localImagePath = req.file?.path;

        // Check if image is provided
        if (!localImagePath) {
            return res.status(400).json({
                success: false,
                message: "UI/UX image is missing",
            });
        }

        // Upload to Cloudinary
        let uploadedImage;
        try {
            uploadedImage = await uploadOnCloudinary(localImagePath);
            console.log("Uploaded to Cloudinary:", uploadedImage);
        } catch (error) {
            console.error("Cloudinary upload failed:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to upload image to Cloudinary",
                error: error.message,
            });
        }

        // Save to MongoDB
        const newUIUX = new UIUXDesignModel({
            UIUXImage: uploadedImage.secure_url,
            UIUXTitle,
            UIUXDescription,
        });

        const savedUIUX = await newUIUX.save();

        res.status(201).json({
            success: true,
            message: "UI/UX Design added successfully",
            data: savedUIUX,
        });

    } catch (err) {
        console.error("Error in AddUIUXDesignController:", err);
        res.status(500).json({
            success: false,
            message: "Server Error while creating UI/UX post",
            error: err.message,
        });
    }
};


// GET - Fetch all posts
export const getUIUXDesignController = async (req, res) => {
    try {
        const posts = await UIUXDesignModel.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: posts });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch posts', error: err.message });
    }
};
