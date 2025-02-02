import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

// create model from schema
const UserModel = mongoose.model("User", userSchema);

export default class UserRepository {
  async resetPassword(userID, hashedNewPassword) {
    try {
      let user = await UserModel.findById(userID);
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

  async signUp({ name, email, hashedPassword, type }) {
    try {
      const password = hashedPassword;
      // create instance of Model
      const newUser = new UserModel({ name, email, password, type });
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

  // async signIn(email, password) {
  //   try {
  //     return await UserModel.findOne({ email, password });
  //   } catch (err) {
  //     console.log(err);
  //     throw new ApplicationError("Something went wrong with database.", 500);
  //   }
  // }

  async findByEmail(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database.", 500);
    }
  }
}
