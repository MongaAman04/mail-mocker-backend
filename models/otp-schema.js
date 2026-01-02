import mongoose from 'mongoose';

const OtpSchema = new mongoose.Schema({
    email: String,
    otp: String,
    createdAt: {
        type: Date,
        expires: '5m',
        default: Date.now
    }
})

const Otp = mongoose.model('otp', OtpSchema)
export default Otp