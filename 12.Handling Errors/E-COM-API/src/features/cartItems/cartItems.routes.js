// Manage routes/paths to CartItemsController

// 1. Import express.
import express from "express";
import { CartItemsController } from "./cartItems.controller.js";

// 2. Initialize Express router.
const cartRouter = express.Router();

const cartItemsController = new CartItemsController();

cartRouter.delete("/", (req, res, next) =>
  cartItemsController.delete(req, res, next)
);
cartRouter.post("/", (req, res, next) =>
  cartItemsController.add(req, res, next)
);
cartRouter.get("/", (req, res, next) =>
  cartItemsController.get(req, res, next)
);

export default cartRouter;
