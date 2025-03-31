const express = require("express");
const leaveController = require("../controllers/leaveController");

const router = express.Router();

// Create Leave Request
router.post("/", leaveController.createLeaveRequest);

// Get all Leave Requests
router.get("/", leaveController.getAllLeaveRequests);

// Get Leave Request by ID
router.get("/:id", leaveController.getLeaveRequestById);

// Update Leave Status (approve/reject)
router.put("/:id", leaveController.updateLeaveStatus);

// Delete Leave Request
router.delete("/:id", leaveController.deleteLeaveRequest);

module.exports = router;
