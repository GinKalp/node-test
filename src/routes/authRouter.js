const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')

// POST /auth/register - registers user
router.post('/register', authController.register)
// POST /auth/login - logs in user
router.post('/login', authController.login)

module.exports = router