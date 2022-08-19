const express = require("express")
const app = express();

//for token
var jwt = require("jsonwebtoken")
const secretKey = "chrollo"

//for able to see cookies
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
                    //create jwt -> payload,header, secretKey algo by default ->SHA256
                    var token = jwt.sign({ data: user['_id'] }, secretKey);

                    res.cookie("JWT", token)
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


app.patch("/forgetPassword", async (req, res) => {
    try {
        let { email } = req.body;
        let afterFiveMin = Date.now() + 1000 * 60 * 5;
        let otp = otpGenerator();
        let user = await userModal.findOneAndUpdate({ email: email }, { otp: otp, otpExpiry: afterFiveMin }, { new: true })
        console.log(user)
        res.json({
            data: user,
            message: "otp sent to your mail"
        });
    } catch (err) {
        res.send(err.message)
    }
})

app.patch("/resetPassword", async (req, res) => {
    try {
        let { otp, password, confirmPassword, email } = req.body;
        let user = await userModal.findOne(email)
        let currTime = Date.now();
        if(currTime > user.otpExpiry){
            delete user.otp;
            delete user.otpExpiry
            await user.save();
            res.json({
                message:"OTP expired"
            })
        }else{
            if(user.otp != otp){
                res.json({
                    message:"OTP does not Match"
                })
            }else{
                user = await userModal.findOneAndUpdate({otp},{password, confirmPassword},{runValidators:true, new : true})
                delete user.otp;
                delete user.otpExpiry
                await user.save();

                res.json({
                    user:user,
                    message:"user password reset complete"
                })
            }
        }
        console.log(user);
        delete user.otp;
        await user.save();
        res.json({
            data: user,
            message: "password for user has been reset successfully"
        })
    } catch (error) {
        res.send(error.message);
    }

})


function otpGenerator() {
    return Math.floor(Math.random() * 1000000);
}

//cookies
app.get("/users", protectRoute, async (req, res) => {
    try {
        let users = await userModal.find();
        res.send(users)
        res.send("Cookie read")
    } catch (error) {
        res.send(error);
    }

})

app.get("/user", protectRoute, async (req, res) => {
    try {
        const userId = req.userId;
        const user = await userModal.findById(userId);
        //to send userdata
        res.json({
            data: user,
            message: "Data about user is sent"
        })

    } catch (error) {
        res.data(error)
    }
})


function protectRoute(req, res, next) {
    try {
        let cookies = req.cookies;
        let JWT = cookies.JWT;
        if (cookies.JWT) {
            const token = jwt.verify(JWT, secretKey)
            console.log(token);
            let userId = token.data;
            req.userId = userId;
        } else {
            res.send("You are not logged in. Kindly login")
        }
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
    next();
}





app.listen(3000, function () {
    console.log("Server Started at 3000")
})