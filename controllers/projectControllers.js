import dotenv from 'dotenv';
dotenv.config();
import ProjectModel from "../model/projectModel.js";
import { uploadOnCloudinary } from '../utils/cloudinary.js';


export const createPortfolioToCloudinary = async(req, res) => {
    try  {
        console.log("req.body:", req.body);
        console.log("req.files:", req.files);

        const image = req.files?.image?.[0]?.path;
        const {title, description} = req.body;
        const pdf = req.files?.pdf?.[0]?.path;

        if(!image || !pdf) {
            return res.status(400).json({
                success: false,
                message: "Please upload both image and pdf",
            });
        }

        if(!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required",
            });
        }
        let uploadedImage, uploadedPdf;
        try {
            uploadedImage = await uploadOnCloudinary(image);
            uploadedPdf = await uploadOnCloudinary(pdf);
            // console.log("uploadedImage:", uploadedImage);
            // console.log("uploadedPdf:", uploadedPdf); //?.url
        } catch (error) {
            console.error("Error Uploading Image to Cloudinary:", error);
            return res.status(500).json({
                success: false,
                message: "Error Uploading Image to Cloudinary"});
        }

        const newProduct = new ProjectModel({
            image: uploadedImage?.secure_url || '',
            title: title.trim(), 
            description: description.trim(),
            pdf: uploadedPdf?.secure_url || '', 
        });
        const savedProduct = await newProduct.save();

        res.status(201).json({
            success: true,
            message: 'Image Uploaded and Pdf File Saved',
            data: savedProduct,
        });
    } catch (error) {
        console.error('Upload Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during upload',
            error: error.message,
        });
    }
};