import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  // 1.Read the token
  // console.log(req.headers);
  const token = req.headers["authorization"];

  //   2.If no token return the error
  if (!token) {
    return res.status(401).send("Unathorized (token not found)");
  }
  //   3.Check if token is valid
  try {
    const payload = jwt.verify(token, "emFFqlTESdcWC1lqqOHMlQ96VJhVGBY5");
    console.log(payload);
  } catch (error) {
    // 4.return error
    return res.status(401).send("Unauthorized");
  }
  //   5. Call Next middleware
  next();
};

export default jwtAuth;
