import express from "express";
import tweetRoutes from "./src/features/tweet/tweet.routes.js";
// import {
//   getTweets,
//   createTweet,
// } from "./src/features/tweet/tweet.controller.js";
const app = express();

// middleware for accessing these routes after refactoring
app.use("/api/tweets", tweetRoutes);

app.listen(5000, () => {
  console.log("server is listening at port 5000");
});
