import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    image: {
        type: String,
        // required: true,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    pdf: {
        type: String,
        // required: true
    },
},{timestamps: true});

const ProjectModel = mongoose.model('Project', projectSchema);

export default ProjectModel;