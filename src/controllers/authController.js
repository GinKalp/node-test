const {registerUser, loginUser} = require("../models/authModel");
const {dbFail, dbSuccess} = require("../helpers/requestHelper");
const {verifyHash} = require("../helpers/hashHelper");
const jwt = require('jsonwebtoken')

module.exports = {
    register: async (req, res) =>{
        // made email unique in database
        const registerData = await registerUser(req.body)
        console.log(registerData)

        if (!registerData.isSuccess) return dbFail(res, registerData.error)

        dbSuccess(res, "User registered.")
    },
    login: async (req, res) =>{
        const { email, password } = req.body
        // check if we have a user email in our table
        const loginData = await loginUser(email)
        console.log(loginData)
        if (!loginData.isSuccess) return dbFail(res, loginData.error)
        if (!loginData.result) return dbFail(res, "User not found.", 400)

        if (!verifyHash(password, loginData.result.password)){

            return dbFail(res, "Incorrect email or password", 400)
        }
        const userToBeEncrypted = {
            email: loginData.result.email,
            userId: loginData.result.id
        }
        const token = jwt.sign(userToBeEncrypted, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
        dbSuccess(res, `User logged in`, {email: userToBeEncrypted.email, userId: userToBeEncrypted.userId, token})
    },
}