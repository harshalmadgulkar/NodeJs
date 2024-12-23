import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: [25, "Name can't be greater than 25 characters."],
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/.+\@.+\../, "Please enter valid email"],
  },
  password: {
    type: String,

    // Apply such validations (Commented as we are hashing password and it will always break below written validations)

    // validate: {
    //   validator: function (value) {
    //     // Password validation criteria
    //     const passwordCriteria =
    //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    //     return passwordCriteria.test(value);
    //   },
    //   message:
    //     "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    // },
    required: true,
  },
  type: { type: String, enum: ["Customer", "Seller"] },
});
