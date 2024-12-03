import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

class ProductRepository {
  constructor() {
    this.collection = "products";
  }

  async add(newProduct) {
    try {
      // 1. Get database
      const db = getDB();
      // 2. Get the collection
      const collection = db.collection(this.collection);
      // 3. Insert the new product (document)
      const result = await collection.insertOne(newProduct);
      console.log(result);
      return newProduct;
    } catch (err) {
      throw new ApplicationError("Something went wrong with database.", 500);
    }
  }

  async getAll() {
    try {
      // 1. Get database
      const db = getDB();
      // 2. Get the collection
      const collection = db.collection(this.collection);
      // 3. Find all products
      return await collection.find().toArray();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database.", 500);
    }
  }

  async get(id) {
    try {
      // 1. Get database
      const db = getDB();
      // 2. Get the collection
      const collection = db.collection(this.collection);
      // 3. Find all products
      return await collection.findOne({ _id: new ObjectId(id) });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database.", 500);
    }
  }

  async filter(minPrice, maxPrice, category) {
    // 1. Get database
    const db = getDB();
    // 2. Get the collection
    const collection = db.collection(this.collection);
    // 3. Find all products
    let filterExpression = {};
    if (minPrice) {
      filterExpression.price = { $gte: parseFloat(minPrice) };
    }
    if (maxPrice) {
      filterExpression.price = {
        ...filterExpression,
        $lte: parseFloat(maxPrice),
      };
    }
    if (category) {
      filterExpression.category = category;
    }
    console.log(filterExpression);
    return await collection.find(filterExpression).toArray();
  }

  async rateProduct(userID, productID, rating) {
    try {
      // 1. Get database
      const db = getDB();
      // 2. Get the collection
      const collection = db.collection(this.collection);
      // 3. Removes Existing Entry
      await collection.updateOne(
        { _id: new ObjectId(productID) },
        { $pull: { ratings: { userID: new ObjectId(userID) } } }
      );
      // 4. Add new rating Entry
      await collection.updateOne(
        { _id: new ObjectId(productID) },
        { $push: { ratings: { userID: new ObjectId(userID), rating } } }
      );
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database.", 500);
    }
  }
}

export default ProductRepository;
