import mongoose from "mongoose";

const portSchema = new mongoose.Schema({
    image: {
        type: String,
        // required: true
    },
    title: {
        type: String,
        required: true
    }
});

const PortModel = mongoose.model("Port", portSchema);
export default PortModel;