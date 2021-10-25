const {registerUser} = require("../models/authModel");
// helpers for testing purposes
const {dbFail, dbSuccess} = require("../helpers/requestHelper");

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
    login: (req, res) =>{

    },
}