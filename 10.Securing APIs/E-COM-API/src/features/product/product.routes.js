// Manage routes/paths to productcontroller

// 1.Import express
import express from "express";
import ProductController from "./product.controller.js";
import { upload } from "../../middlewares/fileUpload.middleware.js";

// 2.Intialize express router
const productRouter = express.Router();
const productController = new ProductController();

// All paths to controller methods
// /api/products already used in server.js with server.use("/api/products")
productRouter.get("/", productController.getAllProducts);
productRouter.post(
  "/",
  upload.single("imageUrl"),
  productController.addProduct
);
productRouter.get("/filter", productController.filterProducts);
productRouter.get("/:id", productController.getOneProduct);

export default productRouter;
