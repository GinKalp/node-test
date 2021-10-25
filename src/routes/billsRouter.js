const express = require('express');
const router = express.Router();
const billsController = require('../controllers/billsController')

// GET /bills/:id - paduoda vartotojui visas sąskaitas tos grupės.
router.get('/:id', billsController.getBills)
// POST /bills/ - paduoda vartotojui visas sąskaitas tos grupės.
router.post('/', billsController.postBill)

module.exports = router