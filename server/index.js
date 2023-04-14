import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Razorpay from "razorpay";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

const connectDB = async () => {
  const connect = await mongoose.connect(process.env.MONGODB_URI);
  if (connect) {
    console.log("MongoDB is Connected...🪙");
  }
};
connectDB();

app.post("/createOrder", async(req, res) => {
    const { amount, notes } = req.body;
  
    const order = await instance.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "Anand_Ujwal_"+Math.floor(Math.random() * 1000000),
      notes: notes
    })
  
    res.json({
      success: true,
      message: "Order created successfully...",
      order: order
    });
  })
  

app.listen(PORT, () => {
  console.log(`The server is Running on Port ${PORT}🙏`);
});
