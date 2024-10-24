import { body, validationResult } from "express-validator";

export const formValidation = async (req, res, next) => {
  // 1.Setup rules for valdation
  const rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("image").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Profile image is required");
      }
      return true;
    }),
  ];
  // 2. Run the validation rules
  await Promise.all(rules.map((rule) => rule.run(req)));
  // 3.Check if there are any errors after running the rules.
  var validationErrors = validationResult(req);
  // console.log(validationErrors);
  // 4.if errors return error message
  if (!validationErrors.isEmpty()) {
    return res.status(422).json({
      errors: validationErrors.array(),
    });
  }
  // 5. if no errors, continue with the next middleware
  next();
};
