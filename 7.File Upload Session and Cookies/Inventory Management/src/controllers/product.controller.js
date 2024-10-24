import ProductModel from "../models/product.model.js";

class ProductsController {
  getProducts(req, res, next) {
    var products = ProductModel.getAll();
    res.render("index", { products, email: req.session.email });
  }

  getAddProduct(req, res, next) {
    res.render("new-product", {
      errorMessage: null,
      email: req.session.email,
    });
  }

  postAddProduct(req, res, next) {
    const { name, desc, price } = req.body;
    const imageUrl = "images/" + req.file.filename;
    ProductModel.add(name, desc, price, imageUrl);
    var products = ProductModel.getAll();
    res.render("index", { products, email: req.session.email });
  }

  getUpdateProductView(req, res, next) {
    // 1. if product exists then return view
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if (productFound) {
      res.render("update-product", {
        product: productFound,
        errorMessage: null,
        email: req.session.email,
      });
    }
    // 2. else return errors.
    else {
      res.status(401).send("Product not found");
    }
  }

  postUpdateProduct(req, res) {
    console.log(req);
    const { id, name, desc, price } = req.body;
    const imageUrl = "images/" + req.file.filename;
    // console.log(imageUrl);
    ProductModel.update(id, name, desc, price, imageUrl);
    var products = ProductModel.getAll();
    res.render("index", { products, email: req.session.email });
  }

  deleteProduct(req, res) {
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if (!productFound) {
      return res.status(401).send("Product not found");
    }
    ProductModel.delete(id);
    var products = ProductModel.getAll();
    res.render("index", { products, email: req.session.email });
  }
}

export default ProductsController;
