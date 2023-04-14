import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

const connectDB = async()=>{
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    if(connect){
        console.log("MongoDB is Connected...👋")
    }
}
connectDB();





app.listen(PORT, () => {
    console.log(`The server is Running on Port ${PORT}🙏`);
});