import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from "../../../models/user-model.js";

const secret_key = process.env.JWT_SECRET || "mailmocker-secret-key";

export const RegisterController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const user = await userModel.create({
            username,
            email,
            password
        });

        const token = jwt.sign({ userId: user._id, email: user.email }, secret_key, {
            expiresIn: '1d'
        });

        res.status(200).json({
            message: 'Login successful',
            token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const LoginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            secret_key,
            { expiresIn: '1d' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
