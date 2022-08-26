const express = require("express")
const authRouter = express.Router();
const { signUpController, loginController, resetPasswordController, forgetPasswordController } = require("../controller/authController");

authRouter.post("/signup", signUpController)

authRouter.post("/login", loginController)

authRouter.patch("/resetPassword", resetPasswordController)

authRouter.patch("/forgetPassword", forgetPasswordController)

module.exports = authRouter;