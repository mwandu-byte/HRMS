const { Employee } = require("../models");

// Create a new employee
exports.createEmployee = async (req, res) => {
    try {
        const { first_name, last_name, dob, contact, email, position, salary, departmentId } = req.body;

        // Ensure that departmentId is handled
        const employee = await Employee.create({
            first_name,
            last_name,
            dob,
            contact,
            email,
            position,
            salary,
            departmentId,  // Adding departmentId as part of the employee creation
        });

        res.status(201).json(employee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Get all employees
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll({
            include: ['department'],  // Include department in the result
        });
        res.status(200).json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Get a single employee by ID
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id, {
            include: ['department'],  // Include department in the result
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

// Update an employee
exports.updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (employee) {
            const { first_name, last_name, dob, contact, email, position, salary, departmentId } = req.body;

            // Update employee with the new values
            await employee.update({
                first_name,
                last_name,
                dob,
                contact,
                email,
                position,
                salary,
                departmentId,  // Handle departmentId in the update as well
            });

            res.status(200).json(employee);
        } else {
            res.status(404).json({ message: "Employee not found" });
        }
    } catch (error) {
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
