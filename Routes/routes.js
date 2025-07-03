import express from 'express';
import {createPortfolioToCloudinary, getAllPortfolios} from '../controllers/projectControllers.js';
import { upload,  svgUpload} from '../middleware/multer.js';
import { textSliderImage, addIndustry, addPort, addService, getServices, getTextSliderImages, getPorts, getIndustries } from '../controllers/landingPageControllers.js';
import { addTeamMember, getTeamMembers } from '../controllers/ourTeamControllers.js';
import { BlogController, AllBlogController, BlogImageController, getBlogByIdController } from '../controllers/blogControllers.js';
import { subscribeToNewsletter } from '../controllers/newsletterControllers.js';
import { addTestimonials, getTestimonials } from '../controllers/testimonialsControllers.js';
import { addBrand, getBrands } from '../controllers/brandControllers.js';
import { chatBot, getAllChatBotMessages } from '../controllers/chatBotControllers.js';
import { contactus } from '../controllers/ContactusControllers.js';
import { addTech, getTechs } from '../controllers/techControllers.js';
import { AddUIUXDesignController, getUIUXDesignController } from '../controllers/UIUXDesignTechnologiesController.js';
import { AddBlockchainController, getBlockchainController } from '../controllers/BlockchainPlatformController.js';

const router = express.Router();

router.post('/upload', upload.fields([
    {name: 'image', maxCount: 1},
    {name: 'logo', maxCount: 1},
    { name: 'carousalImage' } 

]),
    createPortfolioToCloudinary
);

router.get('/all-upload', getAllPortfolios);


router.post('/addPort', upload.single('image'), addPort);
router.get("/all-Port", getPorts);

router.post('/addService', upload.fields([
    {name: 'image', maxCount: 1},
    {name: 'video', maxCount: 1},
]), addService
);

router.get("/all-services", getServices);

router.post('/addBrand',upload.single('image'), addBrand);
router.get('/all-brands', getBrands);


router.post('/addIndustry', upload.single('image'), addIndustry);
router.get('/all-Industry', getIndustries);

router.post('/addTeamMember', svgUpload.single('avatar'), addTeamMember);
router.get('/All-team', getTeamMembers);

// // router.post('/upload-image', upload.single('image'), BlogImageController);
// router.post('/upload-image', upload.single('upload'), BlogImageController);
// router.post('/create-blogs', BlogController);
// router.get('/blogs', AllBlogController);

router.post('/upload-image', upload.single('upload'), BlogImageController);
router.post('/create-blogs', upload.single("featuredImage"), BlogController);
router.get('/blogs', AllBlogController);
router.get('/blogs/:id', getBlogByIdController);

router.post("/subscribe", subscribeToNewsletter);

router.post("/addTestimonials", svgUpload.single('avatar'), addTestimonials);
router.get('/all-Testimonials', getTestimonials);

router.post("/textSliderImage", upload.fields([
    {name: 'textImage1', maxCount:1},
    {name: 'textImage2', maxCount:1}
]),
    textSliderImage
);

router.get("/all-textSliderImage", getTextSliderImages);

router.post('/chatBot', chatBot);

router.get('/getAllChatBotMessages', getAllChatBotMessages);

router.post("/contact-us", contactus);

router.post("/addTech", upload.single('image'), addTech);

router.get('/getTechs', getTechs);

router.post('/add-uiux', svgUpload.single('UIUXImage'), AddUIUXDesignController);
router.get('/all-uiux', getUIUXDesignController);

router.post('/add-blockchain-platform', svgUpload.single('BlockchainImage'), AddBlockchainController);
router.get('/all-blockchain-platform', getBlockchainController);


export default router;





