import express from 'express';
import isLoggedIn from '../middleware/authmiddleware.js';
import { LoginController, RegisterController } from '../api/auth/auth-controller.js';
import { generateOtpController, verifyOtpController } from '../api/auth/otp-controller.js';

const authRouter = express.Router();

authRouter.get('/user', isLoggedIn, (req, res) => {
    res.json(req.user);
    res.send(req.user);
});

authRouter.post('/register', RegisterController);

authRouter.post('/login', LoginController);

authRouter.post('/generate-otp', generateOtpController)
authRouter.post("/verify-otp", verifyOtpController)

export default authRouter;
