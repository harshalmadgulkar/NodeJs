import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import path from "path";
import ProductController from "./src/controllers/product.controller.js";
import validationMiddleware from "./src/middlewares/validation.middleware.js";

// create server by calling express
const server = express();

// Setup view engine settings
server.set("view engine", "ejs");
// exposing static files from public folder
app.use(express.static('public'));
// set directory of views (static files)
server.use(express.static("src/views"));
// Setup where view files is.
server.set("views", path.resolve("src", "views"));

// expressEjsLayouts setup so that
// By default, Express EJS Layouts looks for a template with the name layout in the
// views/layouts directory. This template is considered the layout template.
// If you want to use a different layout template, you can specify it in your route
// using the layout option.
// .use will applied to each request
server.use(expressEjsLayouts);

app.use(express.json());

// a middleware configuration in an Express.js server.
// express.urlencoded is a built-in middleware function in Express.js
// that parses incoming requests with URL-encoded payloads. The extended option
// is a boolean that indicates whether to use the qs library for parsing or not.
// It populates the *req.body* object with key-value pairs.
// allowing for a JSON-like experience with URL-encoded.
// BEFORE POST METHODS
server.use(express.urlencoded({ extended: true }));

// Create an instance of ProductController
const productController = new ProductController();

// create / (default) site (GET method)
server.get("/", productController.getProducts);

// create /new router for new product page (GET method)
server.get("/add-product", productController.getAddProduct);

// post method at /new to submit data
server.post(
  "/add-product",
  validationMiddleware,
  productController.postAddProduct
);


// get request for update product with id params
server.get("/update-product/:id", productController.getUpdateProductView);

// post method at /update-product/:id to update data with id params
server.post("/update-product", productController.postUpdateProduct);

// get method at /delete-product/:id to delete data with id params
server.get("/delete-product/:id", productController.getDeleteProduct);

// Define servering port
server.listen(3400, () => {
  console.log("server is listening on port 3400");
});
