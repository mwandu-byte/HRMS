const { NextOfKin, Employee } = require("../models");

// Create or Update Next of Kin for an employee
exports.createOrUpdateNextOfKin = async (req, res) => {
  const t = await sequelize.transaction(); // Start Transaction
  try {
    const { employeeId, first_name, last_name, relationship, contact, address } = req.body;

    // Check if employee exists
    const employee = await Employee.findByPk(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Check if NextOfKin exists for the employee
    const existingNextOfKin = await NextOfKin.findOne({ where: { employeeId } });
    if (existingNextOfKin) {
      // If it exists, update the record
      await existingNextOfKin.update({
        first_name,
        last_name,
        relationship,
        contact,
        address
      }, { transaction: t });

      // Commit transaction
      await t.commit();
      return res.status(200).json({ message: "Next of kin updated successfully", data: existingNextOfKin });
    }

    // If no NextOfKin exists, create a new record
    const nextOfKin = await NextOfKin.create({
      employeeId,
      first_name,
      last_name,
      relationship,
      contact,
      address
    }, { transaction: t });

    // Commit transaction
    await t.commit();
    res.status(201).json({ message: "Next of kin assigned successfully", data: nextOfKin });
  } catch (error) {
    await t.rollback(); // Revert any changes if there's an error
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Get Next of Kin for a specific employee
exports.getNextOfKin = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    const nextOfKin = await NextOfKin.findOne({ where: { employeeId } });

    if (!nextOfKin) {
      return res.status(404).json({ message: "Next of kin not found for this employee" });
    }

    res.status(200).json(nextOfKin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
