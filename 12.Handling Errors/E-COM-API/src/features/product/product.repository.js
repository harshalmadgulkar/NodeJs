import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import mongoose from "mongoose";
import { productSchema } from "./product.schema.js";
import { reviewSchema } from "./review.schema.js";
import { categorySchema } from "./category.schema.js";

const ProductModel = mongoose.model("Product", productSchema);
const ReviewModel = mongoose.model("Review", reviewSchema);
const CategoryModel = mongoose.model("Category", categorySchema);

class ProductRepository {
  // constructor() {
  //   this.collection = "products";
  // }

  async add(newProduct) {
    try {
      // 1. Adding Product
      const savedProduct = await newProduct.save();
      // 2. Convert category names to ObjectIds
      // todo Use .distinct("_id") Instead of .select("_id") + .map()
      const categoryIds = await CategoryModel.find({
        name: { $in: newProduct.categories },
      }).select("_id");

      // Extract only the ObjectId values into array
      const categoryObjectIds = categoryIds.map((cat) => cat._id);

      // 3. Update categories with valid ObjectIds
      await CategoryModel.updateMany(
        { _id: { $in: categoryObjectIds } }, // Use categoryObjectIds instead of newProduct.categories
        { $push: { products: new mongoose.Types.ObjectId(savedProduct._id) } }
      );
      return savedProduct;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database.", 500);
    }
  }

  async getAll() {
    try {
      // 1. Get database
      // const db = getDB();
      const db = await ProductModel.find();
      // 2. Get the collection
      // const collection = db.collection(this.collection);
      // 3. Find all products
      // return await collection.find().toArray();
      return db;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database.", 500);
    }
  }

  async get(id) {
    try {
      // 1. Get database
      // const db = getDB();
      // 2. Get the collection
      // const collection = db.collection(this.collection);
      // 3. Find one products
      // return await collection.findOne({ _id: new ObjectId(id) });
      const db = await ProductModel.findById(id);
      return db;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database.", 500);
    }
  }

  async filter(minPrice, categories) {
    try {
      // Build the filter expression
      let filterExpression = [];

      // Add minPrice filter if provided
      if (minPrice) {
        const priceFilter = { price: { $gte: parseFloat(minPrice) } };
        filterExpression.push(priceFilter);
      }

      // Add categories filter if provided
      if (categories) {
        // Parse categories from JSON string
        let parsedCategories;
        try {
          parsedCategories = JSON.parse(categories.replace(/'/g, '"'));
        } catch (error) {
          throw new ApplicationError("Invalid categories format.", 400);
        }

        // Use $in operator to filter by categories
        const categoryFilter = { category: { $in: parsedCategories } };
        filterExpression.push(categoryFilter);
      }

      // If no filters are provided, return all products
      if (filterExpression.length === 0) {
        return await ProductModel.find(
          {},
          {
            name: 1,
            price: 1,
            ratings: { $slice: -2 },
            _id: 1,
            sizes: 1,
          }
        ).exec();
      }

      // Query the database with the filter expression
      const products = await ProductModel.find(
        { $or: filterExpression },
        {
          name: 1,
          price: 1,
          ratings: { $slice: -2 },
          _id: 1,
          sizes: 1,
        }
      ).exec(); // Use exec() to execute the query

      return products;
    } catch (err) {
      console.error(err);
      throw new ApplicationError(
        "Something went wrong with the database.",
        500
      );
    }
  }

  // async rateProduct(userID, productID, rating) {
  //   try {
  //     // 1. Get database
  //     const db = getDB();
  //     // 2. Get the collection
  //     const collection = db.collection(this.collection);
  //     // 3. Removes Existing Entry
  //     await collection.updateOne(
  //       { _id: new ObjectId(productID) },
  //       { $pull: { ratings: { userID: new ObjectId(userID) } } }
  //     );
  //     // 4. Add new rating Entry
  //     await collection.updateOne(
  //       { _id: new ObjectId(productID) },
  //       { $push: { ratings: { userID: new ObjectId(userID), rating } } }
  //     );
  //   } catch (err) {
  //     console.log(err);
  //     throw new ApplicationError("Something went wrong with database.", 500);
  //   }
  // }

  async rateProduct(userID, productID, rating) {
    try {
      // 1. Check if product exists
      const productToUpdate = await ProductModel.findById(productID);
      if (!productToUpdate) {
        throw new Error("Product not found");
      }

      // Find the existing review
      const userReview = await ReviewModel.findOne({
        product: new ObjectId(productID),
        user: new ObjectId(userID),
      });
      if (userReview) {
        userReview.rating = rating;
        await userReview.save();
      } else {
        const newReview = new ReviewModel({
          product: new ObjectId(productID),
          user: new ObjectId(userID),
          rating: rating,
        });
        await newReview.save();
      }
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async averageProductPricePerCategory() {
    try {
      // Use Mongoose's aggregate method on the ProductModel
      const result = await ProductModel.aggregate([
        {
          // 1. Group by category and calculate the average price
          $group: {
            _id: "$categories",
            averagePrice: { $avg: "$price" },
          },
        },
      ]);

      return result;
    } catch (err) {
      console.error(
        "Error calculating average product price per category:",
        err
      );
      throw new ApplicationError(
        "Something went wrong while calculating average prices.",
        500
      );
    }
  }
}

export default ProductRepository;
