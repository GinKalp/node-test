const express = require('express');
const router = express.Router();
const billsController = require('../controllers/billsController')

// GET /bills/:id - paduoda vartotojui visas sąskaitas tos grupės.
router.get('/:id', billsController.getBills)
// POST /bills/ - įrašo naują sąskaitą specifinei grupei (front'as paduoda: group_id, amount, description)
router.post('/', billsController.postBill)

module.exports = router