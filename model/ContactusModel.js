import mongoose from "mongoose";

const ContactusSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    phoneCountryCode: {
        type : String,
        required: true
    },
    phoneNumber: {
        type : String,
        required: true
    },
    services: {
        type: String,
        required: true
    },
    message: {
        type: String,
        // required: true
    }
});

const contactUsModel = mongoose.model('Contactus' , ContactusSchema);

export default contactUsModel;

