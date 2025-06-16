import nodemailer from 'nodemailer';

export const contactus = async (req, res) => {
    try {
        const {name, email, phoneNumber, websiteUrl, lookingFor, message} = req.body || {};
        console.log("Request Body:", req.body);

        const AdminMail = process.env.ADMIN_MAIL;
        const AdminMail2 = process.env.ADMIN_MAIL2;

        if(!email || !AdminMail || !AdminMail2) {
            return res.status(400).json({
                success: false,
                message: "Missing Email or Admin Email",
                data: {email: email || "Not Provided", AdminMail, AdminMail2}
            });
        }
        
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: true,
            auth: {
                user: process.env.USER_MAIL,
                pass: process.env.EMAIL_PASS
            }
        });
        const ClientMailOptions = {
            from: process.env.USER_MAIL,
            to: email,
            subject: "thank you for contacting us",
            html: `
                <div style= "font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2>Thank you for reaching out</h2>
                    <p>Dear ${name},</p>
                    will get back to you shortly.</p>
                    <p><strong>Here's what we received from you:</strong></p>
                    <ul>
                        <li><strong>Name:</strong>${name}</li>
                        <li><strong>Email:</strong>${email}</li>
                        <li><strong>phoneNumber:</strong>${phoneNumber}</li>
                        <li><Strong>Website URL:</Strong>${websiteUrl}</li>
                        <li><Strong>Looking For:</Strong>${lookingFor}</li>
                        <li><strong>message</strong>${message}</li>
                    </ul>

                    <p>If any of the above information is incorrect, feel free to contact us again.</p>
                    <p>Best regards,<br>
                    DevNexus Tram<br>
                    <a href="http://devnexus.in/">https://devnexus.in</a></p>
                </div>`
        };

        //define email content for admin
        const AdminMailOptions = {
            from: process.env.USER_MAIL,
            to: AdminMail,
            subject: "Contact Us",
            html: `
            <p>Dear DevNexus Team</p>
            <p>We have received a new inquiry via the Contact Us form.
            Please find the client details below:</p>
            <p><b>Name:</b>${name}</p>
            <p><b>Email:</b>${email}</p>
            <p><b>phoneNumber:</b>${phoneNumber}</p>
            <p><b>Website URL:</b>${websiteUrl || "Not Provide"}</p>
            <p><b>Looking For:</b>${lookingFor || "Not specified"}</p>
            <p><b>message: </b>${message}</p>
            <p>Please follow up with the client at your earliest convenience.</p>
            `,
        };

        const AdminMailOptions2 = {
            from: process.env.USER_MAIL,
            to: AdminMail2,
            subject: "Contact Us",
            html: `
            <p>Dear DevNexus Team</p>
            <p>We have received a new inquiry via the Contact Us form.
            Please find the client details below:</p>
            <p><b>Name:</b>${name}</p>
            <p><b>Email:</b>${email}</p>
            <p><b>phoneNumber</b>${phoneNumber}</p>
            <p><b>Website URL:</b>${websiteUrl || "Not Provide"}</p>
            <p><b>Looking For:</b>${lookingFor || "Not specified"}</p>
            <p><b>message</b>${message}</p>
            <p>Please follow up with the client at your earliest convenience.</p>
            `,
        };
        //Send mail to client and Devnexus
        await transporter.sendMail(ClientMailOptions);
        await transporter.sendMail(AdminMailOptions);
        await transporter.sendMail(AdminMailOptions2);

        res.status(200).json({success: true, message: 'sent successfully'})
    } catch (error) {
        console.log("Email Error", error);
        res.status(500).json({success: false, message: 'Error Sending Email'})
    }
};
