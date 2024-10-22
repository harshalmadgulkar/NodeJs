import path from "path";
import ProductModel from "../models/product.model.js";

export default class ProductController {
  // to send products page with products data
  getProducts(req, res) {
    let products = ProductModel.getAll();
    res.render("index", { products });
    // console.log(products);
    // console.log(path.resolve());
    // return res.sendFile(path.resolve('src', 'views', 'products.html'));
  }

  // send new-product view page
  getAddProduct(req, res) {
    return res.render("new-product", { errorMessage: null });
  }

  // receive new product to add in products list and
  // send products page view with products list
  postAddProduct(req, res) {
    // Access data from form
    // console.log('res', req.body);
    ProductModel.add(req.body);
    let products = ProductModel.getAll();
    res.render("index", { products });
  }

  getUpdateProductView(req, res, next) {
    // 1. If product exists return view
    const id = req.params.id;
    // console.log(req.params);
    const productFound = ProductModel.getById(id);
    // console.log(productFound);
    if (productFound) {
      res.render("update-product", {
        product: productFound,
        errorMessage: null,
      });
    }
    // 2.else return errors
    else {
      res.status(401).send("Product not found");
    }
  }

  // receive updated product to update in products list and
  // send products page view with products list
  postUpdateProduct(req, res) {
    // Access data from form
    // console.log('req', req.body);
    ProductModel.update(req.body);
    let products = ProductModel.getAll();
    res.render("index", { products });
  }

  getDeleteProduct(req, res) {
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if (!productFound) {
      return res.status(401).send("Product not found!");
    }
    ProductModel.delete(id);
    let products = ProductModel.getAll();
    res.render("index", { products });
  }
}
