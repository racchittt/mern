const express = require('express');
const {calculateFuelEvents,fuel} = require('../controllers/fuelController')
const router = express.Router();

router.get('/calculate', calculateFuelEvents);
router.get('/chart', fuel)

module.exports = router;