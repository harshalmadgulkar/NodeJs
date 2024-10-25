// Import express
import express from "express";
import bodyParser from "body-parser";
import productRouter from "./src/features/product/product.routes.js";
// Create server
const server = express();

server.use(bodyParser.json());

// For all requests related to product,
// redirect to product routes (which uses /api/products in url)
server.use("/api/products", productRouter);

// Default request handler
server.get("/", (req, res) => {
  res.send("Welcome to E-Commerce APIs");
});
// Specify port
server.listen(3200, () => {
  console.log("Server is running at 3200");
});
