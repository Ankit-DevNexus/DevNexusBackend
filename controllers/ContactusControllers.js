import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// import contactUsModel from '../model/ContactusModel.js';
import {getContactUsModel} from '../model/ContactusModel.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to load and replace HTML placeholders
const loadHtmlTemplate = (filename, replacements = {}) => {
    const filePath = path.join(__dirname, `../EmailTemplate/${filename}`);
    let html = fs.readFileSync(filePath, 'utf-8');

    for (const [key, value] of Object.entries(replacements)) {
        html = html.replaceAll(`[${key}]`, value);
    }

    return html;
};

// Service-specific content
const serviceContent = {
    'webDevelopment': {
        subject: 'Web Development Services - Thank You!',
        body: `Thank you for contacting us for Web Development. Our team will reach out shortly with the best digital solutions tailored to your needs.`,
        template: 'web_development.html'
    },
    'mobileDevelopment': {
        subject: 'Mobile Development Services - Thank You!',
        body: `Thank you for showing interest in our Mobile App Development services. We'll help turn your app idea into reality.`,
        template: 'mobile_development.html'
    },
    'UIUX': {
        subject: 'UI/UX Design Services - Thank You!',
        body: `Thank you for reaching out regarding UI/UX design. We aim to create intuitive and elegant experiences for your users.`,
        template: 'ui_ux_template.html'
    },
    'digitalMarketing': {
        subject: 'Digital Marketing Services - Thank You!',
        body: `Thank you for your interest in Digital Marketing. We will help grow your brand's online presence and visibility.`,
        template: 'digital_marketing.html'
    },
    'BlockChain': {
        subject: 'Blockchain Solutions - Thank You!',
        body: `We're excited to discuss how Blockchain technology can enhance your project. Our team will contact you soon.`,
        template: 'blockchain_tech.html'
    },
    'AITechnologies': {
        subject: 'AI Solutions - Thank You!',
        body: `Thanks for considering our AI-powered solutions. Let's innovate together and automate your business intelligence.`,
        template: 'ai_technologies.html'
    },
    'EmailMarketing': {
        subject: 'AI Solutions - Thank You!',
        body: `Thanks for considering our AI-powered solutions. Let's innovate together and automate your business intelligence.`,
        template: 'EmailMarketing.html'
    },
 
    'other': {
        subject: 'Thank You for Reaching Out to DevNexus Solutions!',
        body: `Thank you for contacting DevNexus Solutions. One of our specialists will get back to you shortly.`,
        template: 'custom_req.html'
    }
};

export const contactus = async (req, res) => {
    try {
        const { name, lastname, email, phoneNumber, services, message } = req.body;
        const content = serviceContent[services] || serviceContent.other;


        // Save contact form data to DB
        const contactUsModel = await getContactUsModel();

        const newContact = new contactUsModel({
            name,
            lastname,
            email,
            phoneNumber,
            services,
            message
        });

        await newContact.save();

        console.log("Client email:", email);
        console.log("Admin email:", process.env.ADMIN_MAIL.trim());

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: true,
            auth: {
                user: process.env.USER_MAIL,
                pass: process.env.EMAIL_PASS
            }
        });

        // === Email to Client ===
        const clientHtmlContent = loadHtmlTemplate(content.template, {
            'Client Name': name +" "+ lastname,
            'Email': email,
            'Phone Number': phoneNumber,
            'Service': services,
            'Message': message
        });

        const clientMailOptions = {
            from: `"DevNexus Solutions" <${process.env.USER_MAIL}>`,
            to: email.trim(), // Client's email
            subject: content.subject,
            html: clientHtmlContent // Send HTML template to client
        };

        // === Email to Owner  ===
        const ownerMailOptions = {
            from: `"Website Contact Form" <${process.env.USER_MAIL}>`,
            to: process.env.ADMIN_MAIL.trim(), // Owne r's email
            subject: `New Contact Request - ${services}`,
            text: `New contact form submission:
                \nName: ${name}
                \nEmail: ${email}
                \nPhone: ${phoneNumber}
                \nService: ${services}
                \nMessage: ${message}`
        };

        await transporter.sendMail(clientMailOptions);
        await transporter.sendMail(ownerMailOptions);

        res.status(200).json({ message: 'Form submitted and emails sent successfully.' });
    } catch (error) {
        console.error('Mail sending error:', error);
        res.status(500).json({ error: 'Failed to send email.' });
    }
};
// import nodemailer from 'nodemailer';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { getContactUsModel } from '../model/ContactusModel.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Helper to load and replace HTML placeholders
// const loadHtmlTemplate = (filename, replacements = {}) => {
//     const filePath = path.join(__dirname, `../EmailTemplate/${filename}`);
//     let html = fs.readFileSync(filePath, 'utf-8');

//     for (const [key, value] of Object.entries(replacements)) {
//         html = html.replaceAll(`[${key}]`, value);
//     }

//     return html;
// };

// // Service-specific content
// const serviceContent = {
//     'webDevelopment': {
//         subject: 'Web Development Services - Thank You!',
//         body: `Thank you for contacting us for Web Development. Our team will reach out shortly with the best digital solutions tailored to your needs.`,
//         template: 'web_development.html'
//     },
//     'mobileDevelopment': {
//         subject: 'Mobile Development Services - Thank You!',
//         body: `Thank you for showing interest in our Mobile App Development services. We'll help turn your app idea into reality.`,
//         template: 'mobile_development.html'
//     },
//     'UIUX': {
//         subject: 'UI/UX Design Services - Thank You!',
//         body: `Thank you for reaching out regarding UI/UX design. We aim to create intuitive and elegant experiences for your users.`,
//         template: 'ui_ux_template.html'
//     },
//     'digitalMarketing': {
//         subject: 'Digital Marketing Services - Thank You!',
//         body: `Thank you for your interest in Digital Marketing. We will help grow your brand's online presence and visibility.`,
//         template: 'digital_marketing.html'
//     },
//     'BlockChain': {
//         subject: 'Blockchain Solutions - Thank You!',
//         body: `We're excited to discuss how Blockchain technology can enhance your project. Our team will contact you soon.`,
//         template: 'blockchain_tech.html'
//     },
//     'AITechnologies': {
//         subject: 'AI Solutions - Thank You!',
//         body: `Thanks for considering our AI-powered solutions. Let's innovate together and automate your business intelligence.`,
//         template: 'ai_technologies.html'
//     },
//     'EmailMarketing': {
//         subject: 'AI Solutions - Thank You!',
//         body: `Thanks for considering our AI-powered solutions. Let's innovate together and automate your business intelligence.`,
//         template: 'EmailMarketing.html'
//     },

//     'other': {
//         subject: 'Thank You for Reaching Out to DevNexus Solutions!',
//         body: `Thank you for contacting DevNexus Solutions. One of our specialists will get back to you shortly.`,
//         template: 'custom_req.html'
//     }
// };

// export const contactus = async (req, res) => {
//     try {
//         const { name, lastname, email, phoneCountryCode, phoneNumber, services, message } = req.body;
//         const content = serviceContent[services] || serviceContent.other;

//         // Save contact form data to DB
//         const contactUsModel = await getContactUsModel();

//         // Step 1: Save contact form data to DB
//         const newContact = new contactUsModel({
//             name,
//             lastname,
//             email,
//             phoneCountryCode,
//             phoneNumber,
//             services,
//             message
//         });

//         await newContact.save();

//         console.log("Client email:", email);
//         console.log("Admin email:", process.env.ADMIN_MAIL.trim());

//         const transporter = nodemailer.createTransport({
//             host: process.env.SMTP_HOST,
//             port: Number(process.env.SMTP_PORT),
//             secure: true,
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS
//             }
//         });

//         // === Email to Client ===
//         const clientHtmlContent = loadHtmlTemplate(content.template, {
//             'Client Name': name +" "+ lastname,
//             'Email': email,
//             'Phone Number': phoneNumber,
//             'Service': services,
//             'Message': message
//         });

//         const clientMailOptions = {
//             from: `"DevNexus Solutions" <${process.env.USER_MAIL}>`,
//             to: email.trim(), // Client's email
//             subject: content.subject,
//             html: clientHtmlContent // Send HTML template to client
//         };

//         // === Email to Owner  ===
//         const ownerMailOptions = {
//             from: `"Website Contact Form" <${process.env.USER_MAIL}>`,
//             to: process.env.ADMIN_MAIL.trim(), // Owner's email
//             subject: `New Contact Request - ${services}`,
//             text: `New contact form submission:
//                 \nName: ${name}
//                 \nEmail: ${email}
//                 \nPhone: ${phoneNumber}
//                 \nService: ${services}
//                 \nMessage: ${message}`
//         };

//         await transporter.sendMail(clientMailOptions);
//         await transporter.sendMail(ownerMailOptions);

//         res.status(200).json({ message: 'Form submitted and emails sent successfully.' });
//     } catch (error) {
//         console.error('Mail sending error:', error);
//         res.status(500).json({ error: 'Failed to send email.' });
//     }
// };