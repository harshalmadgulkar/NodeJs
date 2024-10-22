import express, { urlencoded } from 'express';
import path from 'path';
import expressEjsLayouts from 'express-ejs-layouts';
import { renderBlogForm } from './src/controllers/blog.controller.js';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve('src', 'views'));
app.use(expressEjsLayouts);

// Write your code here
app.get('/createBlog', renderBlogForm);

export default app;
