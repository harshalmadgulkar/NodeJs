// Please don't change the pre-written code

export const validateBlog = (req, res) => {
  // Write your code here
  const { title, description, image } = req.body;
  let errors = [];

  if (!title || title.trim() == '') {
    errors.push('The title field should not be empty.')
  }
  if (title.length < 3) {
    errors.push('The title field should contain at least 3 characters.')
  }

  if (!description || description.trim() == '') {
    errors.push('The description field should not be empty.')
  }
  if (description.length < 10) {
    errors.push('The description field should contain at least 10 characters.')
  }

  try {
    const validUrl = new URL(image)
  } catch (err) {
    errors.push('The image URL provided should be a valid URL.')
  }
  
  if (errors.length > 0) {
    return res.status(400).render('addBlog', { errors, success: false })
  }
  res.status(201).render("addBlog", { errors: null, success: true });
  console.log(errors);
};
export const renderBlogForm = (req, res) => {
  res.render("addBlog", { errors: null, success: false });
};
