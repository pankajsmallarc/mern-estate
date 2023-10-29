import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors'
import mongoose from 'mongoose';
dotenv.config();

mongoose.connect(process.env.DATABASE).then(() => {
    console.log("connected to MOngoDB successfully".bgCyan)
}).catch((err) => {
    console.warn(err)
})

const app = express();
app.listen(4000,()=>{
    console.log("Server is running at 4000".bgYellow)
})