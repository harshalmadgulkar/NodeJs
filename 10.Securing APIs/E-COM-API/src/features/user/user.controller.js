import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";

export default class UserController {
  signup(req, res) {
    const { name, email, password, type } = req.body;
    const user = UserModel.signUp(name, email, password, type);
    res.status(201).send(user);
  }

  signin(req, res) {
    const { email, password } = req.body;
    const result = UserModel.signIn(email, password);
    if (!result) {
      return res.status(400).send("Incorrect Credentials");
    } else {
      // 1.Create token
      const token = jwt.sign(
        { userID: result.id, email: result.email },
        "emFFqlTESdcWC1lqqOHMlQ96VJhVGBY5",
        { expiresIn: "1h" }
      );
      // 2.Send token
      return res.status(200).send(token);
    }
  }
}
