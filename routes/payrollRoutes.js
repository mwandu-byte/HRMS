const express = require("express");
const payrollController = require("../controllers/payrollController");

const router = express.Router();

// Create Payroll
router.post("/", payrollController.createPayroll);

// Get all Payroll records
router.get("/", payrollController.getAllPayrolls);

// Get Payroll by Employee ID
router.get("/:employeeId", payrollController.getPayrollByEmployeeId);

// Update Payroll by Employee ID
router.put("/:employeeId", payrollController.updatePayroll);

// Delete Payroll by Employee ID
router.delete("/:employeeId", payrollController.deletePayroll);

module.exports = router;
