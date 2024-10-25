import ProductModel from "./product.model.js";

class ProductController {
  getAllProducts(req, res) {
    const products = ProductModel.getAll();
    res.status(200).send(products);
  }

  addProduct(req, res) {
    const { name, desc, price, imageUrl, category, sizes } = req.body;
    const newProduct = {
      name,
      desc,
      price: parseFloat(price),
      imageUrl: req.file.filename,
      category,
      sizes: sizes.split(","),
    };
    const createdProduct = ProductModel.add(newProduct);
    res.status(201).send(createdProduct);
  }

  getOneProduct(req, res) {
    const id = req.params.id;
    const product = ProductModel.getOne(id);
    if (!product) {
      res.status(404).send("Product not found#");
    } else {
      res.status(200).send(product);
    }
  }

  filterProducts(req, res) {
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const category = req.query.category;
    const result = ProductModel.filter(minPrice, maxPrice, category);
    res.status(200).send(result);
  }
  rateProduct(req, res) {}
}

export default ProductController;
