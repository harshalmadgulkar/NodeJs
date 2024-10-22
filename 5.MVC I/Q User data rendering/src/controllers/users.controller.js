// Please don't change the pre-written code
// Import the necessary modules here
import { userModel } from '../models/users.model.js';

export const userController = async (req, res) => {
  let users = await userModel();
  // console.log(users);
  res.render('index', { users: users });
};
