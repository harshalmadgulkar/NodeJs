import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
  inStock: Number,
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  categories: [
    String
    // {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Category",
    // },
  ],
  sizes: [String],
});
