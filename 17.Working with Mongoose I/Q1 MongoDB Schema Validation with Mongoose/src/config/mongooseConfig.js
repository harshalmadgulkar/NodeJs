import mongoose from "mongoose";

const url = "mongodb://localhost:27017";

export const connectUsingMongoose = async () => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected using mongoose");
  } catch (err) {
    console.log(err);
  }
};
