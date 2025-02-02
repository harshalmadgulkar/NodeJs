import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async resetPassword(req, res, next) {
    const { newPassword } = req.body;
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);
    const userID = req.userID;
    try {
      await this.userRepository.resetPassword(userID, hashedNewPassword);
      res.status(200).send("Password is updated");
    } catch (err) {
      console.log(err);
      console.log("passing error to middleware");
      next(err);
    }
  }

  async signUp(req, res, next) {
    const { name, email, password, type } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      // const user = new UserModel(name, email, hashedPassword, type);
      const user = await this.userRepository.signUp({
        name,
        email,
        hashedPassword,
        type,
      });
      res.status(201).send(user);
    } catch (err) {
      console.log(err);
      console.log("passing error to middleware");
      next(err);
    }
  }

  async signIn(req, res, next) {
    try {
      // 1. Find user by email
      const user = await this.userRepository.findByEmail(req.body.email);
      if (!user) {
        return res.status(400).send("Incorrect Credentials");
      } else {
        // 2. Compare password with hashedPassword
        const result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
          // 3. Create token.
          const token = jwt.sign(
            {
              userID: user._id,
              email: user.email,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "1h",
            }
          );
          // 4. Send token.
          return res.status(200).send(token);
        } else {
          return res.status(400).send("Incorrect Credentials");
        }
      }
    } catch (err) {
      console.log(err);
      console.log("passing error to middleware");
      next(err);
    }
  }
}
