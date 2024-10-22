import ProductModel from '../models/product.model.js';
// Create instance of Product Model
const productModel = new ProductModel();

export default class ProductController {
  getProducts = (req, res) => {
    //  Write your code here
    let products = productModel.fetchProducts();
    res.send(products);
  };
}
