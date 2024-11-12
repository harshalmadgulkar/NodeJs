// Import express
import express from "express";
import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
// Create server
const server = express();
server.use(express.json());

// For all requests related to product,
// redirect to product routes (which uses /api/products in url)
server.use("/api/products", jwtAuth, productRouter);
server.use("/api/users", userRouter);

// Default request handler
server.get("/", (req, res) => {
  res.send("Welcome to E-Commerce APIs");
});
// Specify port
server.listen(3200, () => {
  console.log("Server is running at 3200");
});
