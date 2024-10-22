import express from 'express';
import path from 'path';
import expressEjsLayouts from 'express-ejs-layouts';
import {
  addBlog,
  renderBlogForm,
  renderBlogs,
} from './src/controllers/blog.controller.js';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve('src', 'views'));
app.use(expressEjsLayouts);

// Write your code here
app.get('/', renderBlogs);
app.get('/createBlog', renderBlogForm);
app.use(express.urlencoded({ extended: true }));
app.post('/addblog', addBlog);

export default app;
