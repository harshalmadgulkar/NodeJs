import winston from "winston";

export class customErrorHandler extends Error {
  constructor(statusCode, errMessage) {
    super(errMessage);
    this.statusCode = statusCode;
  }
}

export const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  // Write your code here
  const logger = winston.createLogger({
    level: "error",
    format: winston.format.json(),
    // defaultMeta: { service: "requet-logging" },
    transports: [new winston.transports.File({ filename: "error.log" })],
  });
  if (err instanceof customErrorHandler) {
    const logData = `Timestamp: ${new Date().toISOString()} req URL: ${
      req.url
    } error msg: ${err}}`;

    logger.error(logData);
    res.status(err.statusCode).send(err.message);
  } else {
    res
      .status(500)
      .send("Oops! Something went wrong... Please try again later!");
  }
};
