import mongoose from "mongoose";

const UIUXDesignSchema = new mongoose.Schema({
    UIUXImage: {
        type: String,
        // required: true,
    },
    UIUXTitle: {
        type: String,
        // required: true
    },
    UIUXDescription: {
        type: String,
        required: true
    },
},{
    timestamps: true
});

const UIUXDesignModel = mongoose.model('UIUXCollection', UIUXDesignSchema);

export default UIUXDesignModel;