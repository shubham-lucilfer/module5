const userModal = require("../model/userModal")

async function getAllUserController(req, res) {
    try {
        let users = await userModal.find();
        res.send(users)
        res.send("Cookie read")
    } catch (error) {
        res.send(error);
    }
}

async function profileController(req, res) {
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
}

module.exports = {
    getAllUserController: getAllUserController,
    profileController: profileController
}