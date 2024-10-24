import { authenticateUser, registerUser } from "../models/user.model.js";

export default class UserController {
  getRegister = (req, res, next) => {
    // Write your code here
    res.render("user-register");
  };
  getLogin = (req, res, next) => {
    // Write your code here
    res.render("user-login");
  };
  addUser = (req, res) => {
    // Write your code here
    registerUser(req.body);
    res.render("user-login");
  };
  loginUser = (req, res) => {
    // Write your code here
    const isAuthentic = authenticateUser(req.body);
    if (isAuthentic) {
      res.json({ success: "true", message: "login successful" });
    } else {
      res.json({ success: "false", message: "login failed" });
    }
  };
}
