import { body, validationResult } from "express-validator";

const validateRequest = async (req, res, next) => {
  // valiidate data
  // 1. Setup rules for validation.
  const rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price should be a positive value"),
    body("imageUrl").isURL().withMessage("Invalid url"),
  ];

  // 2. run those rules.
  await Promise.all(rules.map((rule) => rule.run(req)));

  // 3. check if there are any errors after running the rules.
  var validationErrors = validationResult(req);
  console.log(validationErrors);
  // 4. if errros, return the error message
  if (!validationErrors.isEmpty()) {
    return res.render("new-product", {
      errorMessage: validationErrors.array()[0].msg,
    });
  }
  next();
};

export default validateRequest;
