const {registerUser, loginUser} = require("../models/authModel");
// helpers for testing purposes
const {dbFail, dbSuccess} = require("../helpers/requestHelper");
const {verifyHash} = require("../helpers/hashHelper");
const jwt = require('jsonwebtoken')

module.exports = {
    register: async (req, res) =>{
        const registerData = await registerUser(req.body)
        console.log(registerData)

        if (!registerData.isSuccess) return dbFail(res, registerData.error)

        dbSuccess(res, "User registered.")
        // const data = {
        //     title: 'Register',
        //     registerData
        // }
        // res.render('index', data);
    },
    login: async (req, res) =>{
        const { email, password } = req.body
        // check if we have a user email in our table
        const loginData = await loginUser(email)
        console.log(loginData)
        if (!loginData.isSuccess) return dbFail(res, loginData.error)
        if (!loginData.result) return dbFail(res, "User not found.", 400)

        if (!verifyHash(password, loginData.result.password)){

            return dbFail(res, "Passwords don't match.", 400)
        }
        const userToBeEncrypted = {
            email: loginData.result.email,
            userId: loginData.result.id
        }
        const token = jwt.sign(userToBeEncrypted, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
        dbSuccess(res, `User logged in`, {email: userToBeEncrypted.email, userId: userToBeEncrypted.userId, token})
    },
}