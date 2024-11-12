import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  const { jwtToken } = req.cookies;
  //   const token = req.headers["authorization"];
  console.log(jwtToken);
  try {
    const authStatus = jwt.verify(jwtToken, "CodingNinjas2016");
    // res.status(200).json({success:true,msg:"login successfull",authStatus});
  } catch (error) {
    return res.status(401).json({ success: false, msg: error });
    // return res.status(401).send("Unauthorized");
  }
  next();
};

export default jwtAuth;
