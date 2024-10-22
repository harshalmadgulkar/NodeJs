import { blogs } from '../models/blog.model.js';

export const renderBlogs = (req, res) => {
  // Write your code here
  res.render('blogs', { blogs });
};
export const renderBlogForm = (req, res) => {
  // Write your code here
  res.render('addBlogForm');
};
export const addBlog = (req, res) => {
  // Write your code here
  blogs.push(req.body);
  res.render('blogs', { blogs });
};
