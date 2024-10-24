import ProductModel from "../models/product.model.js";
import UserModel from "../models/user.model.js";

export default class UserController {
  getRegister(req, res) {
    res.render("register");
  }

  getLogin(req, res) {
    res.render("login", { errorMessage: null });
  }

  postRegister(req, res) {
    const { name, email, password } = req.body;
    UserModel.add(name, email, password);
    res.render("login", { errorMessage: "" });
  }

  postLogin(req, res) {
    const { email, password } = req.body;
    const user = UserModel.isValidUser(email, password);
    console.log(user);
    if (!user) {
      return res.render("login", { errorMessage: "Invalid credentials" });
    }
    // store email in session of req
    req.session.email = email;
    var products = ProductModel.getAll();
    // return res.render("index", { products, email: req.session.email });
    return res.redirect("/");
  }

  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.clearCookie("lastVisit");
        res.redirect("/login");
      }
    });
  }
}
