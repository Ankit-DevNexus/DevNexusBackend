import nodemailer from 'nodemailer';
import NewsletterModel from '../model/newsLetterModel.js';

export const subscribeToNewsletter = async (req, res) => {
    const {email} = req.query;

    if(!email) {
        return res.status(400).json({success: false, message: "Email is required"});
    }

    try {
        const newsLetter = await NewsletterModel.findOne({email});
        if(newsLetter) {
            return res.status(400).json({success: false, message: "Email already subscribe"});
        }

        const newSubscription = new NewsletterModel({email});
        await newSubscription.save();

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port:Number(process.env.SMTP_PORT),
            secure:Number(process.env.SMTP_PORT),
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from : `"Your Brand" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Welcome to our newsletter",
            html:
            `<h2>Welcome to Our Newsletter!</h2>
            <p>We're glad to have you onboar. You'll receive regular update from us.</p>`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({
            success: true,
            message:"Subscribed and confirmation email sent"
        });   
    } catch (error) {
        console.error("Subscription error", error);
        res.status(500).json({success: false, message: "failed to subscribe", error});
    }
};