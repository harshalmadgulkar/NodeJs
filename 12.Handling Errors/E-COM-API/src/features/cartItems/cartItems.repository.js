import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class CartItemsRepository {
  constructor() {
    this.collectionName = "cartItems";
  }

  async add(cartItem) {
    try {
      // 1. Get database
      const db = getDB();
      // 2. Get collection
      const collection = db.collection(this.collectionName);
      // 3. Insert document
      const result = await collection.insertOne(cartItem);
      return cartItem;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database.", 500);
    }
  }

  async get(userID) {
    try {
      // 1. Get database
      const db = getDB();
      // 2. Get collection
      const collection = db.collection(this.collectionName);
      // 3. Get all data in Array
      return await collection.find({ userID: new ObjectId(userID) }).toArray();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database.", 500);
    }
  }

  async delete(cartItemId, userID) {
    try {
      // 1.Get database
      const db = getDB();
      // 2. Get collection
      const collection = db.collection(this.collectionName);
      // 3. Delete one documents
      const result = await collection.deleteOne({
        _id: new ObjectId(cartItemId),
        userID: new ObjectId(userID),
      });
      return result.deletedCount > 0;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database.", 500);
    }
  }
}
