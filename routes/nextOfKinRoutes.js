const express = require('express');
const nextOfKinController = require('../controllers/nextOfKinController');

const router = express.Router();

// Assign or update Next of Kin for an employee
router.post('/', nextOfKinController.createOrUpdateNextOfKin);

// Get Next of Kin for a specific employee
router.get('/:employeeId', nextOfKinController.getNextOfKin);

module.exports = router;
