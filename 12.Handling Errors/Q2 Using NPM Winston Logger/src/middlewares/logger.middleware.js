import winston from "winston";
// Write your code here
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [new winston.transports.File({ filename: "combined.log" })],
});

export const loggerMiddleware = async (req, res, next) => {
  // Write your code here
  const logData = `${new Date().toString()}\n req URL:${
    req.originalUrl
  } \n reqBody:${JSON.stringify(req.body)}`;
  logger.info(logData);
  next();
};
export default loggerMiddleware;
