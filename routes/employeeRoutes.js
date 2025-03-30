const express = require("express");
const employeeController = require("../controllers/employeeController");

const router = express.Router();

// Create a new employee
router.post("/", employeeController.createEmployee);

// Get all employees
router.get("/", employeeController.getAllEmployees);

// Get a single employee by ID
router.get("/:id", employeeController.getEmployeeById);

// Update an employee
router.put("/:id", employeeController.updateEmployee);

// Delete an employee
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;
