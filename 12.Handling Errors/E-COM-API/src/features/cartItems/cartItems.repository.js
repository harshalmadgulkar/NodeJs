import mongoose from "mongoose";

import { ApplicationError } from "../../error-handler/applicationError.js";
import { cartItemsSchema } from "./cartItems.schema.js";

const CartItemModel = mongoose.model("cartitem", cartItemsSchema);

export default class CartItemsRepository {
  constructor() {
    this.collectionName = "cartItems";
  }

  async add(productID, userID, quantity) {
    try {
      // 1. Adding cart Item
      const savedCartItem = await CartItemModel.findOneAndUpdate(
        { userId: userID, productId: productID },
        { $inc: { quantity } }, // Increment quantity if exists
        { new: true, upsert: true } // Create if not exists
      );
      return savedCartItem;
    } catch (err) {
      console.log("Error updating cart:", err);
      throw new ApplicationError("Could not update cart.", 500);
    }
  }

  async get(userID) {
    try {
      return await CartItemModel.find({ userId: userID });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database.", 500);
    }
  }

  async delete(cartItemID, userID) {
    try {
      // 3. Delete one documents
      const result = await CartItemModel.deleteOne({
        _id: cartItemID,
        userId: userID,
      });
      return result.deletedCount > 0;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database.", 500);
    }
  }
}
