import otpGenerator from 'otp-generator';
import nodeMailer from 'nodemailer';
import otpSchema from "../../../models/otp-schema.js";

export const generateOtpController =async (req, res) => {
    const { email } = req.body;
    const otp = otpGenerator.generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });

    try {
        await otpSchema.create({ email, otp })

        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'OTP Verification',
            text: `Your OTP for verification is: ${otp}`
        })
        res.status(200).send('OTP sent successfully', otp);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending OTP');
    }
}

export const verifyOtpController = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const otpRecord = await otpSchema.findOne({ email, otp }).exec();

        if (otpRecord) {
            res.status(200).send('OTP verified successfully');
        } else {
            res.status(400).send('Invalid OTP');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error verifying OTP');
    }

}