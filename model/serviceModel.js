import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    video: {
        type: String
    }
});

const ServiceModel = mongoose.model("Service", serviceSchema);
export default ServiceModel;