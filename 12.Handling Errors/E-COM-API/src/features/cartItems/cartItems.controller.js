import { ObjectId } from "mongodb";
import CartItemModel from "./cartItems.model.js";
import CartItemsRepository from "./cartItems.repository.js";

export class CartItemsController {
  constructor() {
    this.cartItemsRepository = new CartItemsRepository();
  }

  async add(req, res) {
    const { productID, quantity } = req.body;
    const userID = req.userID;
    const cartItem = new CartItemModel(
      new ObjectId(productID),
      new ObjectId(userID),
      quantity
    );
    const result = await this.cartItemsRepository.add(cartItem);
    res.status(201).send("Cart is updated");
  }

  async get(req, res) {
    const userID = req.userID;
    const items = await this.cartItemsRepository.get(userID);
    return res.status(200).send(items);
  }

  async delete(req, res) {
    const userID = req.userID;
    const cartItemId = req.body.cartItemId;
    const result = await this.cartItemsRepository.delete(cartItemId, userID);
    if (!result) {
      return res.status(404).send("Item not found.");
    }
    return res.status(200).send("Cart item is removed");
  }
}
