const express = require('express');
const router = express.Router();
const accountsController = require('../controllers/accountsController')
const jwtAuth = require('../helpers/jwtHelper')

// POST /accounts/ - vartotojas paduoda account ID ir savo token. Į accounts lentelę įsirašo duomenys.
router.post('/', jwtAuth, accountsController.addAccount)
// GET /accounts/ - paduoda visas vartotojo grupes (JOIN su groups). ID pasiima iš token.
router.get('/', jwtAuth, accountsController.showGroups)

module.exports = router