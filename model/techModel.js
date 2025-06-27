import mongoose from "mongoose";

const techSchema = new mongoose.Schema({
    image: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["Frontend", "Backend", "Database", "UI/UX", "CMS", "DevOps"],
        required: true
    },
}, {timestamps: true});

const TechModel = mongoose.model("TechModel", techSchema);
export default TechModel;