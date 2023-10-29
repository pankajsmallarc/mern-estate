import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors'
import mongoose from 'mongoose';
import userRouter from './routes/userRoute.js';
import authRouter from './routes/authRoute.js';
dotenv.config();
const app = express();
app.use(express.json());
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("connected to MOngoDB successfully".bgCyan)
}).catch((err) => {
    console.warn(err)
})
app.listen(4000, () => {
    console.log("Server is running at 4000")
})
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);

