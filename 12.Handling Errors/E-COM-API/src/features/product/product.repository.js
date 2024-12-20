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

  async filter(minPrice, categories) {
    try {
      // 1. Get database
      const db = getDB();
      // 2. Get the collection
      const collection = db.collection(this.collection);
      // 3. Find all products
      let filterExpression = {};
      if (minPrice) {
        filterExpression.price = { $gte: parseFloat(minPrice) };
      }
      // console.log(filterExpression);
      if (categories) {
        categories = JSON.parse(categories.replace(/'/g, '"'));
        // 3. Ony  returns if any of list of categories filters are applicable IN
        filterExpression = {
          $or: [{ category: { $in: categories } }, filterExpression],
        };
        // 2. Ony  returns if all filters are applicable AND
        // filterExpression = { $and: [{ category: category }, filterExpression] };
        // 1. Ony  returns if one of the filters are applicable OR
        // filterExpression = { $or: [{ category: category }, filterExpression] };
        // filterExpression.category = category;
      }
      // console.log(filterExpression);
      return await collection
        .find(filterExpression)
        // to return _id,name and price
        // .project({ name: 1, price: 1,ratings:1 })
        // to exclude _id
        // .project({ name: 1, price: 1, ratings: 1, _id: 0 })
        // show first rating only
        // .project({ name: 1, price: 1, ratings: { $slice: 1 }, _id: 0 })
        // show last rating only
        // .project({ name: 1, price: 1, ratings: { $slice: -1 }, _id: 0 })
        // show last 2 rating only
        .project({ name: 1, price: 1, ratings: { $slice: -2 }, _id: 0 })
        .toArray();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database.", 500);
    }
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

  async averageProductPricePerCategory() {
    try {
      const db = getDB();
      return await db
        .collection(this.collection)
        .aggregate([
          {
            // 1. Get Avaerage price for each category
            $group: {
              _id: "$category",
              averagePrice: { $avg: "$price" },
            },
          },
        ])
        .toArray();
    } catch (err) {
      console.log("Passing error to middleware");
      next(err);
    }
  }
}

export default ProductRepository;
