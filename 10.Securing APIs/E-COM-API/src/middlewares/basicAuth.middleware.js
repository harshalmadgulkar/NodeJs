import UserModel from "../features/user/user.model.js";

const basicAuthorizer = (req, res, next) => {
  // 1.Check if authorization header is empty
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).send("No authorization details found");
  }
  console.log(authHeader);

  //   2.Extract credentials [Basic wrwrewt3453jbd]
  const base64Credentials = authHeader.replace("Basic", "");
  console.log(base64Credentials);

  //   3.Decode credentaials
  const decodedCreds = Buffer.from(base64Credentials, "base64").toString(
    "utf8"
  );
  console.log(decodedCreds);
  const creds = decodedCreds.split(":"); // [username:password]

  const user = UserModel.getAll().find(
    (u) => u.email == creds[0] && u.password == creds[1]
  );
  if (user) {
    next();
  } else {
    res.status(401).send("Invalid credentials");
  }
};

export default basicAuthorizer;
