import mongoose from 'mongoose';

const dbConnect = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/mailmocker');
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

export default dbConnect;
