import { ApplicationError } from "../../error-handler/applicationError.js";
import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

export default class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAllProducts(req, res) {
    const products = await this.productRepository.getAll();
    res.status(200).send(products);
  }

  async addProduct(req, res) {
    try {
      const { name, desc, price, category, sizes } = req.body;
      const newProduct = new ProductModel(
        name,
        desc,
        parseFloat(price),
        req.file.filename,
        category,
        sizes.split(",")
      );

      const createdRecord = await this.productRepository.add(newProduct);
      res.status(201).send(createdRecord);
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong.", 500);
    }
  }

  async rateProduct(req, res, next) {
    try {
      const userID = req.userID;
      const productID = req.body.productID;
      const rating = req.body.rating;
      await this.productRepository.rateProduct(userID, productID, rating);
      return res.status(200).send("Rating has been added");
    } catch (err) {
      console.log("Passing error to middleware");
      next(err);
    }
  }

  async getOneProduct(req, res) {
    const id = req.params.id;
    const product = await this.productRepository.get(id);
    if (!product) {
      res.status(404).send("Product not found");
    } else {
      return res.status(200).send(product);
    }
  }

  async filterProducts(req, res) {
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const category = req.query.category;
    const result = await this.productRepository.filter(
      minPrice,
      maxPrice,
      category
    );
    res.status(200).send(result);
  }
}
