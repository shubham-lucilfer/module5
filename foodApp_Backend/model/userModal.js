//tech knowledge
//(schema) -> set of feature  and rule a certain entity have

const mongoose = require("mongoose")
const { Schema } = mongoose

let dbLink = "mongodb+srv://dbUser:jwtbaoR713I14Ya3@cluster0.kcjxabm.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(dbLink).then(() => {
    console.log("connected")
}).catch((error) => {
    console.log("error", error)
})



//how to create a scheme -> only entries written will be added to the db

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Enter the name please"]
    },
    password: {
        type: String,
        required: [true, "Enter the password please"]
    },
    confirmPassword: {
        type: String,
        required: [true, "Confirm the password please"],
        //custom validator
        validate: {
            validator: function () {
                return this.password == this.confirmPassword
            },
            message: "Password mismatch"
        }
    },
    email: {
        type: String,
        required: [true, "Enter the name please"],
        unique: [true, "Duplicate email found"]
    },
    phoneNumber: {
        type: String,
        minLength: [10, "Minimum length no reached"],
        maxLength: [10, "Exceeded the maximum length"],
    },
    pic: {
        type: String,
        default: "logo2.png"
    },
    otp:{
        type: String
    },
    address: {
        type: String
    }
})


const userModel = mongoose.model("foodusermodel", userSchema);

module.exports = userModel