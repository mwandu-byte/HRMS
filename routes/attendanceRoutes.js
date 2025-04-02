const express = require("express");
const attendanceController = require("../controllers/attendanceController");

const router = express.Router();

// Create new attendance record
router.post("/", attendanceController.createAttendance);

// Get all attendance records
router.get("/", attendanceController.getAllAttendance);

// Get attendance by employee
// router.get("/employee/:id", attendanceController.getAttendanceByEmployee);

// Update attendance record
router.put("/:id", attendanceController.updateAttendance);

// Delete attendance record
router.delete("/:id", attendanceController.deleteAttendance);

module.exports = router;
