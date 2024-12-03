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
      // 3.Find the product
      const product = await collection.findOne({
        _id: new ObjectId(productID),
      });
      // 4. Check if the user has already rated the product
      const existingRating = product?.ratings?.find((r) => {
        return r.userID.equals(new ObjectId(userID)); // Use .equals() to compare ObjectId
      });
      console.log("existingRating:", existingRating);

      if (existingRating) {
        // 5. Update the rating
        const result = await collection.updateOne(
          {
            _id: new ObjectId(productID),
            "ratings.userID": new ObjectId(userID),
          },
          { $set: { "ratings.$.rating": rating } }
        );
      } else {
        // 5. Add rating
        await collection.updateOne(
          { _id: new ObjectId(productID) },
          { $push: { ratings: { userID: new ObjectId(userID), rating } } }
        );
      }
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database.", 500);
    }
  }
}

export default ProductRepository;
