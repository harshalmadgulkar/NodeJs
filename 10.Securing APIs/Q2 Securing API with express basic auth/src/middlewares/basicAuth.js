// Import the necessary modules here
import { confirmLogin } from "../features/user/model/user.model.js";

const basicAuthMiddleware = (req, res, next) => {
  // 1.Check if authorization header is empty
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  console.log(authHeader);

  // 2.Extract credentials [Basic wrwrewt3453jbd]
  const base64Credentials = authHeader.replace("Basic ", "");
  console.log(base64Credentials);

  // 3.Decode credentaials
  const decodedCreds = Buffer.from(base64Credentials, "base64").toString(
    "utf8"
  );
  console.log(decodedCreds);
  const creds = decodedCreds.split(":"); // [username:password]
  console.log(creds);

  const user = confirmLogin({ email: creds[0], password: creds[1] });
  console.log(user);
  if (user) {
    console.log("Auth completed");
    next();
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
};

export default basicAuthMiddleware;
