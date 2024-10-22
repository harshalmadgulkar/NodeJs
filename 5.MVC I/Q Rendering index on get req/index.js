import express from 'express';
import path from 'path';
import { getProducts } from './src/controllers/product.controller.js';

const app = express();

app.get('/', getProducts);
app.use(express.static('src/views'));

export default app;
