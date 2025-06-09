import dotenv from 'dotenv';
dotenv.config();
import ChatBotModel from '../model/chatBotModel.js';

export const chatBot = async (req, res) => {
        const { name, email, phoneNumber } = req.body;

        if(!name || !email || !phoneNumber) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }
        try {
            const chatBot = new ChatBotModel({name, email, phoneNumber});
            await chatBot.save();
            res.status(201).json({
                success: true,
                message: 'Chat message submit successfully',
                data: chatBot,
            });
        } catch (error) {
            console.error('Error Submitting chatbot message', error);
            res.status(500).json({
                success: false,
                message: 'Error Submitting chatbot message',
            });
        }
};

export const getAllChatBotMessages = async (req, res) => {
    try {
        const chatBotMessage = await ChatBotModel.find().sort({
            createdAt: -1
        });
        res.status(200).json({
            success: true,
            count: chatBotMessage.length,
            data: chatBotMessage,
        });
    } catch (error) {
        console.error('Error fetching chatbot messages', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching chatbot messages',
        });
    }
};