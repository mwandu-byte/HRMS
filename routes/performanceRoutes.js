const express = require("express");
const performanceController = require("../controllers/performanceController");

const router = express.Router();

// Create a new performance record
router.post("/", performanceController.createPerformance);

// Get all performance records
router.get("/", performanceController.getAllPerformance);

// Get performance by employee
router.get("/employee/:id", performanceController.getPerformanceByEmployee);

// Update a performance record
router.put("/:id", performanceController.updatePerformance);

// Delete a performance record
router.delete("/:id", performanceController.deletePerformance);

module.exports = router;
