const express = require("express")
const userRouter = express.Router();

const { getAllUserController, profileController } = require("../controller/userController");
const { protectRoute } = require("../controller/authController");

userRouter.get("/users", protectRoute, getAllUserController)

userRouter.get("/user", protectRoute, profileController)

module.exports = userRouter