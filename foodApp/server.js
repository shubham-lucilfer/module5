const express = require("express")
const app = express();

const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
const userModal = require("./userModal")

//signup
//name
//password
//confirm password
//address
//email
//phone
//pic



app.post("/signup", async (req, res) => {
    try {
        let data = req.body;
        console.log(data);
        let newUser = await userModal.create(data)
        res.json({
            message: "data recieved",
        })
    } catch (error) {
        res.send(error.message)
    }
})

app.post("/login", async (req, res) => {
    try {
        let data = req.body;
        let { email, password } = data
        if (email && password) {
            let user = await userModal.findOne({ email: email })
            if (user) {
                if (user.password == password) {
                    res.cookie("token", "sample value")
                    res.send("User logged in")
                } else {
                    res.send("Password Incorrect")
                }
            } else {
                res.send("Kindly enter correct email")
            }
        } else {
            res.send("Please enter email and password");
        }
    } catch (error) {
        console.log(error.message)
    }
})

app.get("/users", (req, res) => {
    console.log(req.cookies);
})


app.listen(3000, function () {
    console.log("Server Started at 3000")
})