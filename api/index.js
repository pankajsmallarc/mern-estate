import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import userRouter from './routes/userRoute.js';
import authRouter from './routes/authRoute.js';
dotenv.config();

const app = express();

app.use(morgan('dev'));

app.use(cors());

app.use(express.json());

app.use(cookieParser());

mongoose.connect(process.env.DATABASE).then(() => {
    console.log("connected to MOngoDB successfully".bgCyan)
}).catch((err) => {
    console.warn(err)
})
app.listen(4000, () => {
    console.log("Server is running at 4000")
})
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})