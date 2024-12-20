import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const url = process.env.DB_URL;
export const connectUsingMongoose = async () => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected using Mongoose");
  } catch (err) {
    console.log("Something error occured while connecting database");
    console.log(err);
  }
};
