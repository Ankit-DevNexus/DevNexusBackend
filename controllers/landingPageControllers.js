import { uploadOnCloudinary } from '../utils/cloudinary.js';
import dotenv from 'dotenv';
dotenv.config();
// import fs from 'fs';
// import BrandModel from '../model/brandModel.js';
import TextSliderModel from '../model/textSliderModel.js';
import ServiceModel from '../model/serviceModel.js';
import IndustryModel from '../model/industryModel.js';
import PortModel from '../model/portModel.js';

export const addService = async (req, res) => {
    try {
    const {title} = req.body;
    const image = req.files?.image?.[0]?.path;
    const video = req.files?.video?.[0]?.path;

    if (!title || !image || !video) {
        return res.status(400).json({
        success: false,
        message: "Title, image & video is missing",
        });
    }

    let uploadedImage, uploadedVideo;
    try {
        uploadedImage = await uploadOnCloudinary(image);
        uploadedVideo = await uploadOnCloudinary(video);
        console.log("uploadedImage", uploadedImage);
        console.log("uploadedVideo", uploadedVideo);
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        return res.status(500).json({
            success: false,
            message: "Error uploading image to Cloudinary:",
        });
    }


    // Create MongoDB record
    const newProduct = new ServiceModel({
        title,
        image: uploadedImage?.secure_url || "",
        video: uploadedVideo?.secure_url || ""
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
        success: true,
        message: "Image uploaded and product saved successfully",
        data: savedProduct,
    });
    } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({
        success: false,
        message: "Server error during upload",
        error: error.message,
    });
    }
};

export const getServices = async (req, res) => {
    try {
        const services = await ServiceModel.find().sort({ createdAt: -1 }); // latest first
        res.status(200).json({
            success: true,
            message: "Services fetched successfully",
            data: services,
        });
    } catch (error) {
        console.error("Error fetching services:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching services",
            error: error.message,
        });
    }
};

export const textSliderImage = async (req, res) => {
    try {
        const textImage1 = req.files?.textImage1?.[0]?.path;
        const textImage2 = req.files?.textImage2?.[0]?.path;

        if(!textImage1 || !textImage2) {
            return res.status(400).json({
                success: false,
                message: 'Please upload both images',
            });
        }
        let uploadedImage1, uploadedImage2;
        try {
            uploadedImage1 = await uploadOnCloudinary(textImage1);
            uploadedImage2 = await uploadOnCloudinary(textImage2);
            console.log("uploadedImage1", uploadedImage1);
            console.log("uploadedImage2", uploadedImage2);
        } catch (error) {
            console.error("uploading both images failed", error);
            return res.status(500).json({
                success: false,
                message: "Uploaded Both Images to Cloudinary Failed",
                error: error.message,
            });
        }

        const textSlider = new TextSliderModel({
            textImage1: uploadedImage1?.secure_url || "",
            textImage2: uploadedImage2?.secure_url || "",
        });
        const savedResult = await textSlider.save();
        res.status(201).json({
            success: true,
            message: "text slider image uploaded successfully",
            data: savedResult
        });
    } catch (error) {
        console.error("Error in textSlider Image", error);
            res.status(500).json({
                success: false,
                message: "Error in textSlider Image",
                error: error.message,
            });
    }
};

export const getTextSliderImages = async (req, res) => {
    try {
        const sliders = await TextSliderModel.find().sort({ createdAt: -1 }); // optional: latest first
        res.status(200).json({
            success: true,
            message: "Text slider images fetched successfully",
            data: sliders,
        });
    } catch (error) {
        console.error("Error fetching text slider images:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching text slider images",
            error: error.message,
        });
    }
};


// export const addBrand = async (req,res) => {
//     try {
//         const image = req.file?.path;

//         if(!image) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Brand image is missing",
//             });
//         }
//         let uploadedImage;
//         try {
//             uploadedImage = await uploadOnCloudinary(image);
//             console.log("uploadedImage", uploadedImage);
//         } catch(error) {
//             console.error("Error uploading image to Cloudinary:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Error uploading image to Cloudinary:",
//             error: error.message,
//         });
//     }

//     const newBrand = new BrandModel({
//         image : uploadedImage?.url || "",
//     });

//     const savedBrand = await newBrand.save();
//     res.status(201).json({
//         success: true,
//         message: "Image Uploaded and Brand Saved Successfully",
//         data: savedBrand,
//     });
//     }catch (error) {
//     console.error("upload error", error);
//         res.status(500).json({
//             success: false,
//             message: "Server error during upload",
//             error: error.message,
//         });
//     }
// };

export const addPort = async (req, res) => {
    try {
        const {title} = req.body;
        const image = req.file?.path;


    if(!image) {
        return res.status(400).json({
        success: false,
        message: "Port image is missing",
        });
    }

    let uploadedImage;
    try {
        uploadedImage = await uploadOnCloudinary(image);
        console.log("uploadedImage", uploadedImage);
    } catch (error) {
        console.error("Error uploading image to cloudinary", error);
        return res.status(500).json({
            success: false,
            message: "Error Uploading image to Cloudinary",
            error: error.message,
        });
    }
    
    const newPort = new PortModel({
        image: uploadedImage?.url || "",
        title
    });
    const savedPort = await newPort.save();
    res.status(201).json({
        success: true,
        message: "image uploaded and portfolio saved successfully",
        data: savedPort,
    });
} catch (error) {
    console.error("upload error", error);
    res.status(500).json({
        success:false,
        message: "Server error during upload",
        error: error.message
    });
}
};

export const getPorts = async (req, res) => {
    try {
        const ports = await PortModel.find().sort({ createdAt: -1 }); // Optional: latest first
        res.status(200).json({
            success: true,
            message: "Port images fetched successfully",
            data: ports,
        });
    } catch (error) {
        console.error("Error fetching port images:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching port images",
            error: error.message,
        });
    }
};

export const addIndustry = async (req, res) => {
    try {
        const {title} = req.body;
        const image = req.file?.path;

        if(!image) {
            return res.status(400).json({
                success: false,
                message: "Industry image is missing",
            });
        }
        let uploadedImage;
        try {
            uploadedImage = await uploadOnCloudinary(image);
            console.log("uploadedImage", uploadedImage);
        } catch(error) {
            console.error("Error uploading image to cloudinary", error);
            return res.status(500).json({message: "Error uploading image to cloudinary:"})
        }

        const newIndustry = new IndustryModel( {
            title,
            image: uploadedImage?.url || "",
        });
        const savedIndustry = await newIndustry.save();
        res.status(201).json({
            success: true,
            message: "industry image saved successfully",
            data: savedIndustry,
        });
    } catch(error) {
        console.error("Upload Error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error during upload",
            error: error.message,
        });
    }
};

export const getIndustries = async (req, res) => {
    try {
        const industries = await IndustryModel.find().sort({ createdAt: -1 }); // latest first
        res.status(200).json({
            success: true,
            message: "Industries fetched successfully",
            data: industries,
        });
    } catch (error) {
        console.error("Error fetching industries:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching industries",
            error: error.message,
        });
    }
};

