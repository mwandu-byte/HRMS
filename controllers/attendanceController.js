const { Attendance, Employee } = require("../models");

// Create new attendance record
exports.createAttendance = async (req, res) => {
    try {
        const { employeeId, status, reason } = req.body;

        // Create a new attendance record
        const attendance = await Attendance.create({
            employeeId,
            date: new Date(),
            status,
            reason,
        });

        res.status(201).json(attendance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Get all attendance records
exports.getAllAttendance = async (req, res) => {
    try {
        const attendances = await Attendance.findAll({
            include: ['employee'],  // Include the employee details
        });
        res.status(200).json(attendances);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Get attendance for a specific employee
exports.getAttendanceByEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const attendance = await Attendance.findAll({
            where: { employeeId },
            include: ['employee'], // Include employee details in the result
        });

        if (attendance.length > 0) {
            res.status(200).json(attendance);
        } else {
            res.status(404).json({ message: "No attendance records found for this employee" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Update attendance record
exports.updateAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, reason } = req.body;

        const attendance = await Attendance.findByPk(id);

        if (attendance) {
            // Update attendance status and reason
            await attendance.update({
                status,
                reason,
            });

            res.status(200).json(attendance);
        } else {
            res.status(404).json({ message: "Attendance record not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Delete attendance record
exports.deleteAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        const attendance = await Attendance.findByPk(id);

        if (attendance) {
            // Delete the attendance record
            await attendance.destroy();
            res.status(200).json({ message: "Attendance record deleted successfully" });
        } else {
            res.status(404).json({ message: "Attendance record not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
