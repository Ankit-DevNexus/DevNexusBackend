import dotenv from 'dotenv';
dotenv.config();
import ProjectModel from "../model/projectModel.js";
import { uploadOnCloudinary } from '../utils/cloudinary.js';


export const createPortfolioToCloudinary = async(req, res) => {
    try  {
        console.log("req.body:", req.body);
        console.log("req.files:", req.files);
        console.log("PDF File Path:", req.files?.pdf?.[0]?.path);

        const image = req.files?.image?.[0]?.path;
        const logo = req.files?.logo?.[0]?.path;
        const {description, websiteUrl} = req.body;
        const pdf = req.files?.pdf?.[0]?.path;

        if(!image || !logo ||!pdf) {
            return res.status(400).json({
                success: false,
                message: "Please upload image, logo and pdf",
            });
        }

        if( !description || !websiteUrl) {
            return res.status(400).json({
                success: false,
                message: "description are website url are required",
            });
        }
        let uploadedImage, uploadedLogo ,uploadedPdf;
        try {
            uploadedImage = await uploadOnCloudinary(image);
            uploadedLogo = await uploadOnCloudinary(logo);
            uploadedPdf = await uploadOnCloudinary(pdf, {resource_type: "raw"});
            console.log("uploaded pdf url:", uploadedPdf?.secure_url);
            console.log("uploadedPdf:", uploadedPdf?.resource_type); //?.url
        } catch (error) {
            console.error("Error Uploading Image to Cloudinary:", error);
            return res.status(500).json({
                success: false,
                message: "Error Uploading Image to Cloudinary"});
        }

        const newProduct = new ProjectModel({
            image: uploadedImage?.secure_url || '',
            logo: uploadedLogo?.secure_url || '',
            description: description.trim(),
            pdf: uploadedPdf?.secure_url || '', 
            websiteUrl: websiteUrl.trim(),
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

export const getPortfolios = async (req, res) => {
    try {
        const portfolios = await ProjectModel.find().sort({ createdAt: -1 }); // latest first
        res.status(200).json({
            success: true,
            message: "Portfolio data fetched successfully",
            data: portfolios,
        });
    } catch (error) {
        console.error("Error fetching portfolio data:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching portfolio data",
            error: error.message,
        });
    }
};