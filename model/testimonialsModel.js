import mongoose from "mongoose";

const testimonalsSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        // required: true
    },
    name: {
        type: String,
        required: true
    },
    destination: {
        type: String, 
        required: true
    },
    star : {
        type: Number,
        min: 1,
        max: 5,
        required: true
    }
}, {
    timestamps: true
});


const TestimonalsModel = mongoose.model('Testimonals', testimonalsSchema);
export default TestimonalsModel;