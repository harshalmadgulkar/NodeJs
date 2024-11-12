// Manage routes/paths to userController

// 1.Import express
import express from "express";
import UserController from "./user.controller.js";

// 2.Intialize express router
const userRouter = express.Router();
const userController = new UserController();

// All paths to controller methods
// /api/users already used in server.js with server.use("/api/user")
userRouter.post("/signup", userController.signup);
userRouter.post("/signin", userController.signin);

export default userRouter;
