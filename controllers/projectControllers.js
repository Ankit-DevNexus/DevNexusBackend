
import ProjectModel from "../model/projectModel.js";
import { uploadOnCloudinary } from '../utils/cloudinary.js';


export const createPortfolioToCloudinary = async (req, res) => {
    try {
        console.log("req.body:", req.body);
        console.log("req.files:", req.files);

        const image = req.files?.image?.[0]?.path;
        const logo = req.files?.logo?.[0]?.path;
        const carousalImages = req.files?.carousalImage || [];
        const { description, websiteUrl } = req.body;

        if (!image || !logo || carousalImages.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please upload image, logo, and carousal images",
            });
        }

        if (!description || !websiteUrl) {
            return res.status(400).json({
                success: false,
                message: "Description and Website URL are required",
            });
        }

        let uploadedImage, uploadedLogo, uploadedcarousal;
        const uploadedCarousalUrls = [];

        try {
            uploadedImage = await uploadOnCloudinary(image);
            uploadedLogo = await uploadOnCloudinary(logo);
            uploadedcarousal = await uploadOnCloudinary(carousalImages);

            // Upload each carousel image
            for (const img of carousalImages) {
                const result = await uploadOnCloudinary(img.path);
                if (result?.secure_url) {
                    uploadedCarousalUrls.push(result.secure_url);
                }
            }
        } catch (error) {
            console.error("Error Uploading to Cloudinary:", error);
            return res.status(500).json({
                success: false,
                message: "Error uploading files to Cloudinary",
            });
        }

        const newProject = new ProjectModel({
            image: uploadedImage?.secure_url || '',
            logo: uploadedLogo?.secure_url || '',
            description: description.trim(),
            carousalImage: uploadedCarousalUrls,
            websiteUrl: websiteUrl.trim(),
        });

        const savedProject = await newProject.save();

        res.status(201).json({
            success: true,
            message: "Portfolio created successfully",
            data: savedProject,
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





export const getAllPortfolios = async (req, res) => {
    try {
        const portfolios = await ProjectModel.find().sort({ createdAt: -1 }); // latest first

        res.status(200).json({
            success: true,
            message: "All portfolios fetched successfully",
            data: portfolios,
        });
    } catch (error) {
        console.error("Error fetching portfolios:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching portfolios",
            error: error.message,
        });
    }
};


// export const createPortfolioToCloudinary = async (req, res) => {
//     try {
//         console.log("req.body:", req.body);
//         console.log("req.files:", req.files);

//         const image = req.files?.image?.[0]?.path;
//         const logo = req.files?.logo?.[0]?.path;
//         const carousalImages = req.files?.carousalImage || [];
//         const { description, websiteUrl } = req.body;

//         if (!image || !logo || carousalImages.length === 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Please upload image, logo, and carousal images",
//             });
//         }

//         if (!description || !websiteUrl) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Description and Website URL are required",
//             });
//         }

//         let uploadedImage, uploadedLogo;
//         const uploadedCarousalUrls = [];

//         try {
//             uploadedImage = await uploadOnCloudinary(image);
//             uploadedLogo = await uploadOnCloudinary(logo);

//             // Upload each carousel image
//             for (const img of carousalImages) {
//                 const result = await uploadOnCloudinary(img.path);
//                 if (result?.secure_url) {
//                     uploadedCarousalUrls.push(result.secure_url);
//                 }
//             }
//         } catch (error) {
//             console.error("Error Uploading to Cloudinary:", error);
//             return res.status(500).json({
//                 success: false,
//                 message: "Error uploading files to Cloudinary",
//             });
//         }

//         const newProject = new ProjectModel({
//             image: uploadedImage?.secure_url || '',
//             logo: uploadedLogo?.secure_url || '',
//             description: description.trim(),
//             carousalImage: uploadedCarousalUrls,
//             websiteUrl: websiteUrl.trim(),
//         });

//         const savedProject = await newProject.save();

//         res.status(201).json({
//             success: true,
//             message: "Portfolio created successfully",
//             data: savedProject,
//         });
//     } catch (error) {
//         console.error("Upload Error:", error);
//         res.status(500).json({
//             success: false,
//             message: "Server error during upload",
//             error: error.message,
//         });
//     }
// };


