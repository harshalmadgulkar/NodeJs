import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import UserModel from "./user.model.js";

// create model from schema
const userModel = mongoose.model("User", userSchema);

export default class UserRepository {
  async resetPassword(userID, hashedNewPassword) {
    try {
      let user = await userModel.findById(userID);
      if (!user) {
        throw new Error("No such user found!");
      } else {
        user.password = hashedNewPassword;
        user.save();
      }
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database.", 500);
    }
  }

  async signUp(user) {
    try {
      // create instance of Model
      const newUser = new userModel(user);
      await newUser.save();
      return newUser;
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        throw err;
      } else {
        console.log(err);
        throw new ApplicationError("Something went wrong with database.", 500);
      }
    }
  }

  async signIn(email, password) {
    try {
      return await UserModel.findOne({ email, password });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database.", 500);
    }
  }

  async findByEmail(email) {
    try {
      return await userModel.findOne({ email });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database.", 500);
    }
  }
}
