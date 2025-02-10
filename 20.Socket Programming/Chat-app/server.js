import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import http, { createServer } from "http";

const app = express();

// 1. Create Server using http
const server = http.createServer(app);

// 2. Create socket server
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// 3. Use socket events.
io.on("connection", (socket) => {
  console.log("Connection is established.");
  socket.on("disconnect", () => {
    console.log("Connection is disconnected.");
  });
});

server.listen(3000, () => {
  console.log("App is listening on 3000");
});
