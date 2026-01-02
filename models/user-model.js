import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        select: false
    },
    mails: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'mail'
        }
    ]
});


UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('user', UserSchema);
export default User;
