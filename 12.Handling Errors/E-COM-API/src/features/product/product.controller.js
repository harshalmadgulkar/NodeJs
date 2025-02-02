import mongoose from "mongoose";
import { ApplicationError } from "../../error-handler/applicationError.js";
import ProductRepository from "./product.repository.js";
import { productSchema } from "./product.schema.js";

const ProductModel = mongoose.model("Product", productSchema);

export default class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAllProducts(req, res) {
    try {
      const products = await this.productRepository.getAll();
      res.status(200).send(products);
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }

  async addProduct(req, res) {
    try {
      const { name, desc, price, categories, sizes } = req.body;

      const newProductData = {
        name: name,
        description: desc,
        price: parseFloat(price),
        imageUrl: req.file.filename,
        categories: categories.split(",").map((i) => i.trim()),
        sizes: sizes.split(","),
      };
      const newProduct = new ProductModel(newProductData);
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
      console.log(err);
      console.log("Passing error to middleware");
      next(err);
    }
  }

  async getOneProduct(req, res) {
    try {
      const id = req.params.id;
      const product = await this.productRepository.get(id);
      if (!product) {
        res.status(404).send("Product not found");
      } else {
        return res.status(200).send(product);
      }
    } catch (err) {
      console.log(err);
      console.log("Passing error to middleware");
    }
  }

  async filterProducts(req, res) {
    const minPrice = req.query.minPrice;
    // const maxPrice = req.query.maxPrice;
    const categories = req.query.categories;
    const result = await this.productRepository.filter(minPrice, categories);
    res.status(200).send(result);
  }

  async averagePrice(req, res, next) {
    try {
      const result =
        await this.productRepository.averageProductPricePerCategory();
      res.status(200).send(result);
    } catch (err) {
      console.log("Passing error to middleware");
      next(err);
    }
  }
}
