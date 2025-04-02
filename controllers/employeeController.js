const { Employee, Payroll, Department, sequelize } = require("../models");

// Create a new employee and assign salary
exports.createEmployee = async (req, res) => {
    const t = await sequelize.transaction(); // Start Transaction
    try {
        console.log('employee data --->', req.body);
        
        const { first_name, last_name, dob, contact, email, position, departmentId, basicSalary, bonuses, deductions } = req.body;

        // Create Employee
        const employee = await Employee.create({
            first_name, last_name, dob, contact, email, position, departmentId
        }, { transaction: t });

        // Calculate netPay
        const netPay = basicSalary + (bonuses || 0) - (deductions || 0);

        // Create Payroll Record
        await Payroll.create({
            employeeId: employee.id,
            basicSalary:basicSalary,
            bonuses: bonuses || 0,
            deductions: deductions || 0,
            netPay
        }, { transaction: t });

        // Commit transaction
        await t.commit();
        
        res.status(201).json({ employee, payroll: { basicSalary, bonuses, deductions, netPay } });

    } catch (error) {
        await t.rollback(); // Revert any changes if there's an error
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Get all employees (including department and payroll info)
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll({
            include: [
                { model: Department, as: 'department' },
                { model: Payroll, as: 'payroll' }
            ],
        });
        res.status(200).json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Get a single employee by ID (including department and payroll)
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id, {
            include: [
                { model: Department, as: 'department' },
                { model: Payroll, as: 'payroll' }
            ],
        });

        if (employee) {
            res.status(200).json(employee);
        } else {
            res.status(404).json({ message: "Employee not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Update an employee and optionally update salary
exports.updateEmployee = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { first_name, last_name, dob, contact, email, position, departmentId, basicSalary, bonuses, deductions } = req.body;

        // Find Employee
        const employee = await Employee.findByPk(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // Update Employee Info
        await employee.update({ first_name, last_name, dob, contact, email, position, departmentId }, { transaction: t });

        // If salary details are provided, update Payroll
        if (basicSalary !== undefined || bonuses !== undefined || deductions !== undefined) {
            const payroll = await Payroll.findOne({ where: { employeeId: employee.id } });

            if (payroll) {
                const netPay = basicSalary + (bonuses || 0) - (deductions || 0);
                await payroll.update({ basicSalary, bonuses, deductions, netPay }, { transaction: t });
            } else {
                const netPay = basicSalary + (bonuses || 0) - (deductions || 0);
                await Payroll.create({ employeeId: employee.id, basicSalary, bonuses, deductions, netPay }, { transaction: t });
            }
        }

        await t.commit();
        res.status(200).json({ message: "Employee updated successfully" });

    } catch (error) {
        await t.rollback();
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (employee) {
            await employee.destroy();
            res.status(200).json({ message: "Employee deleted successfully" });
        } else {
            res.status(404).json({ message: "Employee not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
