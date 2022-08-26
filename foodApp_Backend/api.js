const express = require("express")
const app = express();

//for able to see cookies
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/userRoutes")
const authRouter = require("./routes/authRoutes")

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);



app.listen(3000, function () {
    console.log("Server Started at 3000")
})