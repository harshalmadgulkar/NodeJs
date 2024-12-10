import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class CartItemsRepository {
  constructor() {
    this.collectionName = "cartItems";
  }

  async add(productID, userID, quantity) {
    try {
      // 1. Get database
      const db = getDB();
      // 2. Get collection
      const collection = db.collection(this.collectionName);
      // get id
      // const id = await this.getNextCounter(db);
      // 3. Find document & Either inset or update
      const result = await collection.updateOne(
        // find
        {
          productID: new ObjectId(productID),
          userID: new ObjectId(userID),
        },
        // create new if no match else update with given quantity
        {
          // $setOnInsert: { _id: id },
          $inc: { quantity: quantity },
        },
        // allow to add new doc
        { upsert: true }
      );
      return result;
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

  // async getNextCounter(db) {
  //   const resultDocument = await db.collection("counters").findOneAndUpdate(
  //     // query
  //     { _id: "cartItemId" },
  //     // update
  //     { $inc: { value: 1 } },
  //     // options returnNewDocument: true will return updated document
  //     { returnNewDocument: true }
  //   );
  //   // console.log(resultDocument.value);
  //   return resultDocument.value;
  // }
}
