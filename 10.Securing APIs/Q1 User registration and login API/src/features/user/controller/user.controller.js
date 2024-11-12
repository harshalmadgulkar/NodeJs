import { addUser, confirmLogin } from "../model/user.model.js";

export const registerUser = (req, res, next) => {
  const { name, email, password } = req.body;
  const user = addUser(name, email, password);
  if (!user) {
    return res.status(400).send("User not created");
  } else {
    return res.status(201).json({ status: "success", user });
  }
};

export const loginUser = (req, res) => {
  const { email, password } = req.body;
  const user = confirmLogin(email, password);
  if (!user) {
    return res
      .status(400)
      .json({ status: "failure", msg: "invalid user details" });
  } else {
    res.status(201).json({ status: "success", msg: "login successful" });
  }
};
