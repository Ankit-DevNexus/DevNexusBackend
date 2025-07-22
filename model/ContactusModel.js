// import mongoose from "mongoose";

// const ContactusSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type:String,
//         required: true
//     },
//     phoneCountryCode: {
//         type : String,
//         required: true
//     },
//     phoneNumber: {
//         type : String,
//         required: true
//     },
//     services: {
//         type: String,
//         required: true
//     },
//     message: {
//         type: String,
//         // required: true
//     }
// });

// const contactUsModel = mongoose.model('Contactus' , ContactusSchema);

// export default contactUsModel;

import mongoose from "mongoose";
import { getDashboardDB } from "../config/ConnectDashboardDB.js";

const ContactusSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String }, // Added if needed
    email: { type: String, required: true },
    phoneCountryCode: { type: String },
    phoneNumber: { type: String, required: true },
    services: { type: String, required: true },
    message: { type: String },
    created_at: { type: Date, default: Date.now }
});

// Create cached variable to avoid redefining
let contactUsModel = null;

export const getContactUsModel = async () => {
    if (!contactUsModel) {
        const db = await getDashboardDB();
        contactUsModel = db.model("Contactus", ContactusSchema);
    }
    return contactUsModel;
};