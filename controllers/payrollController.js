const { Payroll, Employee, sequelize } = require("../models");

// Create Payroll for an Employee
exports.createPayroll = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { employeeId, basicSalary, bonuses, deductions } = req.body;

        // Check if Employee exists
        const employee = await Employee.findByPk(employeeId);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // Calculate netPay
        const netPay = basicSalary + (bonuses || 0) - (deductions || 0);

        // Create Payroll
        const payroll = await Payroll.create({
            employeeId,
            basicSalary,
            bonuses: bonuses || 0,
            deductions: deductions || 0,
            netPay
        }, { transaction: t });

        await t.commit();
        res.status(201).json(payroll);

    } catch (error) {
        await t.rollback();
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Get all Payroll records
exports.getAllPayrolls = async (req, res) => {
    try {
        const payrolls = await Payroll.findAll({
            include: { model: Employee, as: 'employee' }
        });
        res.status(200).json(payrolls);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Get Payroll by Employee ID
exports.getPayrollByEmployeeId = async (req, res) => {
    try {
        const payroll = await Payroll.findOne({
            where: { employeeId: req.params.employeeId },
            include: { model: Employee, as: 'employee' }
        });

        if (!payroll) {
            return res.status(404).json({ message: "Payroll record not found for this employee" });
        }

        res.status(200).json(payroll);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Update Payroll by Employee ID
exports.updatePayroll = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { basicSalary, bonuses, deductions } = req.body;

        // Find Payroll
        const payroll = await Payroll.findOne({ where: { employeeId: req.params.employeeId } });
        if (!payroll) {
            return res.status(404).json({ message: "Payroll record not found for this employee" });
        }

        // Calculate new netPay
        const netPay = basicSalary + (bonuses || 0) - (deductions || 0);

        // Update Payroll
        await payroll.update({ basicSalary, bonuses, deductions, netPay }, { transaction: t });

        await t.commit();
        res.status(200).json(payroll);

    } catch (error) {
        await t.rollback();
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Delete Payroll by Employee ID
exports.deletePayroll = async (req, res) => {
    try {
        const payroll = await Payroll.findOne({ where: { employeeId: req.params.employeeId } });

        if (!payroll) {
            return res.status(404).json({ message: "Payroll record not found" });
        }

        await payroll.destroy();
        res.status(200).json({ message: "Payroll record deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
