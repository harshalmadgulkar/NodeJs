// import fs from "fs";
// const fsPromise = fs.promises;
import winston from "winston";

// async function log(logData) {
//   try {
//     logData = `\n ${new Date().toString()} - ${logData}`;
//     await fsPromise.appendFile("log.txt", logData);
//   } catch (error) {
//     console.log(error);
//   }
// }

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "requet-logging" },
  transports: [new winston.transports.File({ filename: "logs.txt" })],
});
// named export logger
export { logger };

const loggerMiddleware = async (req, res, next) => {
  // 1. log request body
  if (!req.url.includes("signin")) {
    const logData = `${req.url} - ${JSON.stringify(req.body)}`;
    // await log(logData);
    logger.info(logData);
  }
  next();
};

export default loggerMiddleware;
