import mongoose from "mongoose";

const chatBotSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
});

const ChatBotModel = mongoose.model("Chat", chatBotSchema);
export default ChatBotModel;