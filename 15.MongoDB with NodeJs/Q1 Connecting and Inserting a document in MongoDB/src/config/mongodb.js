// 1. Import MongoDB Client
import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/confession";
let client;
// 2. Function to connect to the database
export const connectToMongoDB = () => {
  try {
    MongoClient.connect(url).then((clientInstance) => {
      client = clientInstance;
      console.log("Connected to MongoDB");
    });
  } catch (err) {
    console.log(err);
  }
};

// 3. Function to access the database
export const getDB = () => {
  return client.db();
};
