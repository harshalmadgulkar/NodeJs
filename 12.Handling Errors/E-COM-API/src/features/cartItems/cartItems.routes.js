// Manage routes/paths to CartItemsController

// 1. Import express.
import express from "express";
import { CartItemsController } from "./cartItems.controller.js";

// 2. Initialize Express router.
const cartRouter = express.Router();

const cartItemsController = new CartItemsController();

cartRouter.delete("/", (req, res) => cartItemsController.delete(req, res));
cartRouter.post("/", (req, res) => cartItemsController.add(req, res));
cartRouter.get("/", (req, res) => cartItemsController.get(req, res));

export default cartRouter;
