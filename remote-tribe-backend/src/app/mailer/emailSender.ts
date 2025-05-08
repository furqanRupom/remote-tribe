import nodemailer from 'nodemailer'
import { config } from '../config'

const EmailSender = async (
    email: string | undefined,
    subject: string,
    htmlContent: string,
) => {
    try {
        const transporter = nodemailer.createTransport({
            host: config.app_host,
            port: Number(config.app_port),
            secure: true,
            auth: {
                user: config.app_email,
                pass: config.app_pass,
            },
        })
        await transporter.verify()
        const mailOptions = {
            from: `"RemoteTribe" <${config.app_email}>`,
            to: email,
            subject: subject,
            html: htmlContent,
        }
        const info = await transporter.sendMail(mailOptions)
    } catch (error) {
        console.error('Error sending email:', error)
    }
}
export default EmailSender