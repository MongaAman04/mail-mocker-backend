import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import mailRouter from './src/router/mail-router.js';
import logRouter from './src/router/log-router.js';
import authRouter from './src/router/auth-router.js';
import dbConnect from './src/utils/connection.js';


const app = express();
dotenv.config();

dbConnect()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors())
// app.use(bodyParser().json())


app.get("/", (req, res) => {
    res.send("Api is running ...");
})

app.use('/auth', authRouter);

app.use('/mail',mailRouter)

app.use('/mail',logRouter)

app.listen(3000, () => {
    console.log("server is running good....");

});