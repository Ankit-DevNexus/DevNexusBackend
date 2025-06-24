import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    image: {
        type: String,
        // required: true,
    },
    logo: {
        type: String,
        // required: true
    },
    description: {
        type: String,
        required: true
    },
    carousalImage: {
        type: [String],
        default: [],
    },
    websiteUrl : {
        type: String,
        required: true,
        trim: true,
        validate: {
        validator: function (v) {
            return /^(https?:\/\/)([\w-]+(\.[\w-]+)+)([\/\w .-]*)*\/?$/.test(v);
        },
        message: props => `${props.value} is not a valid URL!`
    }
    },
},{timestamps: true});

const ProjectModel = mongoose.model('Project', projectSchema);

export default ProjectModel;