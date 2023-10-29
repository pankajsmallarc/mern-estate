import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors'
import mongoose from 'mongoose';
import userRouter from './routes/userRoute.js'
dotenv.config();
const app = express();

mongoose.connect(process.env.DATABASE).then(() => {
    console.log("connected to MOngoDB successfully".bgCyan)
}).catch((err) => {
    console.warn(err)
})
app.use('/api/v1',userRouter)
app.listen(4000,()=>{
    console.log("Server is running at 4000".bgYellow)
})
