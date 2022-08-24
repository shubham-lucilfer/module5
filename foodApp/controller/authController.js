const userModal = require("../model/userModal")
var jwt = require("jsonwebtoken")
const secretKey = "chrollo"
const mailSender = require("../utilities/mailSender")


async function loginController(req, res) {
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


}

function otpGenerator() {
    return Math.floor(Math.random() * 1000000);
}

async function forgetPasswordController(req, res) {
    try {
        let { email } = req.body;
        let user = await userModal.findOne({ email })
        if (user) {
            let afterFiveMin = Date.now() + 1000 * 60 * 5;
            let otp = otpGenerator();
            await mailSender(email, otp)
            user.otp = otp;
            user.otpExpiry = afterFiveMin
            await user.save();
            res.json({
                data: user,
                "message": "otp send to your mail"
            })
        } else {
            res.json({
                result: "user with this email does not exist"
            })
        }
        // new = true -> will get update doc
    } catch (err) {
        res.send(err.message)
    }
}


async function signUpController(req, res) {
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
}

async function resetPasswordController(req, res) {
    try {
        let { otp, password, confirmPassword, email } = req.body;
        let user = await userModal.findOne(email)
        let currTime = Date.now();
        if (currTime > user.otpExpiry) {
            delete user.otp;
            delete user.otpExpiry
            await user.save();
            res.json({
                message: "OTP expired"
            })
        } else {
            if (user.otp != otp) {
                res.json({
                    message: "OTP does not Match"
                })
            } else {
                user = await userModal.findOneAndUpdate({ otp }, { password, confirmPassword }, { runValidators: true, new: true })
                delete user.otp;
                delete user.otpExpiry
                await user.save();

                res.json({
                    user: user,
                    message: "user password reset complete"
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

}

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


module.exports = {
    resetPasswordController,
    loginController,
    forgetPasswordController,
    signUpController,
    protectRoute
}