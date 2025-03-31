const { Leave, Employee, sequelize } = require("../models");

// Create Leave Request
exports.createLeaveRequest = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { employeeId, leaveType, startDate, endDate, description } = req.body;

    // Check if Employee exists
    const employee = await Employee.findByPk(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Create Leave Request
    const leave = await Leave.create(
      {
        employeeId,
        leaveType,
        startDate,
        endDate,
        description,
        status: "pending",
      },
      { transaction: t }
    );

    await t.commit();
    res.status(201).json(leave);
  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Get all Leave Requests
exports.getAllLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await Leave.findAll({
      include: { model: Employee, as: "employee" },
    });
    res.status(200).json(leaveRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Get Leave Request by ID
exports.getLeaveRequestById = async (req, res) => {
  try {
    const leave = await Leave.findByPk(req.params.id, {
      include: { model: Employee, as: "employee" },
    });

    if (!leave) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    res.status(200).json(leave);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Approve or Reject Leave
exports.updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const leave = await Leave.findByPk(req.params.id);

    if (!leave) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    // Update leave status
    await leave.update({ status });
    res.status(200).json(leave);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Delete Leave Request
exports.deleteLeaveRequest = async (req, res) => {
  try {
    const leave = await Leave.findByPk(req.params.id);

    if (!leave) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    await leave.destroy();
    res.status(200).json({ message: "Leave request deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
