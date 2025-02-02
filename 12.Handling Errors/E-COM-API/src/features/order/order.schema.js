import mongoose, { Schema } from "mongoose";

export const orderSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  totalAmount: Number,
  timestamp: Date,
});
