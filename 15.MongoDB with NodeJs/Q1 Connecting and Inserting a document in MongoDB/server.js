import app from "./index.js";
// 1. Import function to connect to the database
import { connectToMongoDB } from "./src/config/mongodb.js";

app.listen(3000, () => {
  console.log("server is listening at port 3000");
  // 2. Connect to MongoDB database
  connectToMongoDB();
});
