import mongoose from "mongoose";
import dotenv from "dotenv";
import { categorySchema } from "../features/product/category.schema.js";

dotenv.config();
const url = process.env.DB_URL;
export const connectUsingMongoose = async () => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected using Mongoose");
    addCategories();
  } catch (err) {
    console.log("Something error occured while connecting database");
    console.log(err);
  }
};

async function addCategories() {
  const CategoryModel = mongoose.model("Category", categorySchema);
  const categories = CategoryModel.find();
  if (!categories || (await categories).length == 0) {
    await CategoryModel.insertMany([
      { name: "Books" },
      { name: "Clothing" },
      { name: "Electronics" },
      { name: "Home" },
    ]);
    console.log("Categories added");
  }
  console.log("Categories are already exists.");
}
