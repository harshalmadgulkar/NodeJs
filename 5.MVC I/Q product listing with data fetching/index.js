import express from 'express';
import path from 'path';
import ProductController from './src/controllers/product.controller.js';
const productController = new ProductController();
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve('src', 'views'));
app.get('/', productController.getProducts);
app.use(express.static('src/views'));

export default app;
