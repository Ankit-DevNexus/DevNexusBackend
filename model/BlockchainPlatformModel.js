import mongoose from "mongoose";

const BlockchainSchema = new mongoose.Schema({
    BlockchainImage: {
        type: String,
        // required: true,
    },
    BlockchainTitle: {
        type: String,
        // required: true
    }
},{
    timestamps: true
});

const BlockchainModel = mongoose.model('BlockchainCollection', BlockchainSchema);

export default BlockchainModel;