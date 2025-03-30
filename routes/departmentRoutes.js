const express = require("express");
const departmentController = require("../controllers/departmentController");

const router = express.Router();

// Create a new department
router.post("/", departmentController.createDepartment);

// Get all departments
router.get("/", departmentController.getAllDepartments);

// Get a single department by ID
router.get("/:id", departmentController.getDepartmentById);

// Update a department
router.put("/:id", departmentController.updateDepartment);

// Delete a department
router.delete("/:id", departmentController.deleteDepartment);

module.exports = router;
