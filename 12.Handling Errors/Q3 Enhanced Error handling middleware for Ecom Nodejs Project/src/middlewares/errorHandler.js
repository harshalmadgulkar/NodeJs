// Please don't change the pre-written code

export class customErrorHandler extends Error {
  constructor(statusCode, errMessage) {
    super(errMessage);
    this.statusCode = statusCode;
  }
}

export const errorHandlerMiddleware = (err, req, res, next) => {
  // Write your code here
  if (err instanceof customErrorHandler) {
    console.log("hi");
    res.status(err.statusCode).send(err.message);
  } else {
    console.log("hello");
    res.status(500).send("oops! something went wrong...Try again later!");
  }
  next();
};
