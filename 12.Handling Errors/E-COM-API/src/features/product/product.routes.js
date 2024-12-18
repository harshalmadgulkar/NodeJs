// Manage routes/paths to ProductController

// 1. Import express.
import express from "express";
import ProductController from "./product.controller.js";
import { upload } from "../../middlewares/fileupload.middleware.js";

// 2. Initialize Express router.
const productRouter = express.Router();

const productController = new ProductController();

// All the paths to controller methods.
// localhost/api/products

// Rate Product (POST)
// localhost:4100/api/products/filter?minPrice=10&maxPrice=20&category=Category1
productRouter.post("/rate", (req, res, next) =>
  productController.rateProduct(req, res, next)
);

// Filter Product (GET)
productRouter.get("/filter", (req, res) =>
  productController.filterProducts(req, res)
);

// All Products (GET)
productRouter.get("/", (req, res) =>
  productController.getAllProducts(req, res)
);

// Add Product (POST)
productRouter.post("/", upload.single("imageUrl"), (req, res) =>
  productController.addProduct(req, res)
);

// Average Price (GET)
productRouter.get("/averagePrice", (req, res, next) => {
  productController.averagePrice(req, res);
});

// One Product (GET)
productRouter.get("/:id", (req, res) =>
  productController.getOneProduct(req, res)
);

export default productRouter;
