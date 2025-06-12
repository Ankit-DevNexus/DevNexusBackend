import express from 'express';
import {createPortfolioToCloudinary} from '../controllers/projectControllers.js';
import { upload,  svgUpload} from '../middleware/multer.js';
import { textSliderImage, addIndustry, addPort, addService } from '../controllers/landingPageControllers.js';
import { addTeamMember } from '../controllers/ourTeamControllers.js';
import { BlogImageController, BlogController, AllBlogController, EditBlogController } from '../controllers/blogControllers.js';
import { subscribeToNewsletter } from '../controllers/newsletterControllers.js';
import { addTestimonials } from '../controllers/testimonialsControllers.js';
import { addBrand } from '../controllers/brandControllers.js';
import { chatBot, getAllChatBotMessages } from '../controllers/chatBotControllers.js';
import { contactus } from '../controllers/ContactusControllers.js';
const router = express.Router();

router.post('/upload', upload.fields([
    {name: 'image', maxCount: 1},
    {name: 'logo', maxCount: 1},
    {name: 'pdf', maxCount: 1},
]),
    createPortfolioToCloudinary
);

router.post('/addPort', upload.single('image'), addPort);

router.post('/addService', upload.fields([
    {name: 'image', maxCount: 1},
    {name: 'video', maxCount: 1},
]), addService
);

router.post('/addBrand',upload.single('image'), addBrand);
router.post('/addIndustry', upload.single('image'), addIndustry);

router.post('/addTeamMember', svgUpload.single('avatar'), addTeamMember);

router.post('/upload-image', upload.single('image'), BlogImageController);
router.post('/create-blogs', BlogController);
router.get('/blogs', AllBlogController);
router.put("/:id", EditBlogController);

router.post("/subscribe", subscribeToNewsletter);

router.post("/addTestimonials", svgUpload.single('avatar'), addTestimonials);

router.post("/textSliderImage", upload.fields([
    {name: 'textImage1', maxCount:1},
    {name: 'textImage2', maxCount:1}
]),
    textSliderImage
);

router.post('/chatBot', chatBot);

router.get('/getAllChatBotMessages', getAllChatBotMessages);

router.post("/contact-us", contactus);

export default router;