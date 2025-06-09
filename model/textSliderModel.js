import mongoose from "mongoose";

const textSliderSchema = new mongoose.Schema({
    textImage1: {
        type: String,
        // required: true
    },
    textImage2: {
        type: String,
        // required: true
    }
});

const TextSliderModel = mongoose.model("TextSlider", textSliderSchema);
export default TextSliderModel;