import fs from "fs";
const fsPromise = fs.promises;

// Write your code here
async function log(logData) {
  try {
    await fsPromise.appendFile("log.txt", logData);
  } catch (error) {
    console.log(error);
  }
}

export const loggerMiddleware = async (req, res, next) => {
  // Write your code here
  const logData = `\n ${new Date().toString()} 
  \n req URL:/api/user/${req.url} 
  \n reqBody:${JSON.stringify(req.body)}`;
  await log(logData);
  next();
};
export default loggerMiddleware;
