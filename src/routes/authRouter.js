const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const {validateRegister} = require("../validation/mainValidator");

// POST /auth/register - registers user
router.post('/register', validateRegister, authController.register)
// POST /auth/login - logs in user
router.post('/login', authController.login)

module.exports = router