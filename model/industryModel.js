import mongoose from "mongoose";

const industrySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        // required: true
    }
});

const IndustryModel = mongoose.model("Industry", industrySchema);
export default IndustryModel;