import mongoose, { Schema } from "mongoose";

export const cartItemsSchema = new Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  quantity: Number,
});
