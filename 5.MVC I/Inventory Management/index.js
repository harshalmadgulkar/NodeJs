import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import path from 'path';
import ProductController from './src/controllers/product.controller.js';

const server = express();
// Setup view engine settings
server.set('view engine', 'ejs');
// Setup where view files is.
server.set('views', path.resolve('src', 'views'));

server.use(expressEjsLayouts);

// Create an instance of ProductController
const productController = new ProductController();
// set / (default) site GET method
server.get('/', productController.getProducts);

server.use(express.static('src/views'));

server.listen(3400, () => {
  console.log('server is listening on port 3400');
});
