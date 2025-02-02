import CartItemsRepository from "./cartItems.repository.js";

export class CartItemsController {
  constructor() {
    this.cartItemsRepository = new CartItemsRepository();
  }

  async add(req, res) {
    try {
      const { productID, quantity } = req.body;
      const userID = req.userID;
      // Validate input
      if (!productID || !quantity) {
        return res
          .status(400)
          .json({ message: "Product ID and quantity are required" });
      }
      const result = await this.cartItemsRepository.add(
        productID,
        userID,
        quantity
      );
      console.log(result);
      res.status(201).send("Cart is updated");
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something went wrong");
    }
  }

  async get(req, res) {
    try {
      const userID = req.userID;
      const items = await this.cartItemsRepository.get(userID);
      return res.status(200).send(items);
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }

  async delete(req, res) {
    const userID = req.userID;
    const cartItemID = req.body.cartItemId;
    const isDeleted = await this.cartItemsRepository.delete(cartItemID, userID);
    if (!isDeleted) {
      return res.status(404).send("Item not found.");
    }
    return res.status(200).send("Cart item is removed");
  }
}
