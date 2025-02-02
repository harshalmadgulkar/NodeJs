import mongoose from "mongoose";
import { ApplicationError } from "../../error-handler/applicationError.js";

import { cartItemsSchema } from "../cartItems/cartItems.schema.js";
import { productSchema } from "../product/product.schema.js";
import { orderSchema } from "./order.schema.js";

const CartItemsModel = mongoose.model("CartItems", cartItemsSchema);
const ProductModel = mongoose.model("Product", productSchema);
const OrderModel = mongoose.model("Order", orderSchema);

export default class OrderRepository {
  constructor() {
    this.collection = "orders";
  }

  async placeOrder(userId) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      // 1. Get cart items and calculate total amount.
      const items = await this.getTotalAmount(userId, session);
      const finalTotalAmount = items.reduce(
        (acc, item) => acc + item.totalAmount,
        0
      );
      console.log(finalTotalAmount);

      // 2. Create an order record.
      const newOrder = new OrderModel({
        userId: new mongoose.Types.ObjectId(userId),
        totalAmount: finalTotalAmount,
        createdAt: new Date(),
      });
      await newOrder.save({ session });

      // 3. Reduce the stock.
      for (let item of items) {
        await ProductModel.updateOne(
          { _id: item.productID },
          { $inc: { stock: -item.quantity } },
          { session }
        );
      }

      // 4. Clear the cart items.
      await CartItemsModel.deleteMany(
        {
          userID: new mongoose.Types.ObjectId(userId),
        },
        { session }
      );

      await session.commitTransaction();
      session.endSession();
      return;
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async getTotalAmount(userId, session) {
    const items = await CartItemsModel.aggregate([
      // 1. Get cart items for the user
      {
        $match: { userID: new mongoose.Types.ObjectId(userId) },
      },
      // 2. Get the products from products collection.
      {
        $lookup: {
          from: "products",
          localField: "productID",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      // 3. Unwind the productInfo.
      {
        $unwind: "$productInfo",
      },
      // 4. Calculate totalAmount for each cart item.
      {
        $addFields: {
          totalAmount: {
            $multiply: ["$productInfo.price", "$quantity"],
          },
        },
      },
    ]).session(session); // Use the session for the aggregation
    return items;
  }
}
