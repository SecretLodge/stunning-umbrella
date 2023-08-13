import dotenv from 'dotenv'
import { createTransport } from 'nodemailer'

dotenv.config()

export const transporter = createTransport({
    service: 'hotmail',
    auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.PASSWORD
    }
})