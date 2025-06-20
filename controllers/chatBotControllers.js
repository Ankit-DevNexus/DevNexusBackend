import dotenv from 'dotenv';
dotenv.config();
import ChatBotModel from '../model/chatBotModel.js';
import nodemailer from 'nodemailer';

export const chatBot = async (req, res) => {
        const { name, email, phoneNumber } = req.query;

        if(!name || !email || !phoneNumber) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }
        try {
            const chatBot = new ChatBotModel({name, email, phoneNumber});
            await chatBot.save();

            const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: true,
            auth: {
                user: process.env.USER_MAIL,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"ChatBot Form" <${process.env.USER_MAIL}>`,
            to: email,
            subject: `New ChatBot Message from ${name}`,
            html: `
                <h3>Hello ${name},</h3>
                <p>Thank you for reaching out! We have received your message.</p>
                <p><strong>Your Details:</strong></p>
                <p>Email: ${email}</p>
                <p>Phone: ${phoneNumber}</p>
                <br/>
                <p>We will get back to you shortly.</p>
                <p>– DevNexus Team</p>
            `,
        };
        console.log("Sending email with: ", mailOptions);

        await transporter.sendMail(mailOptions);
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