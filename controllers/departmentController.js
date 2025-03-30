const { Department } = require("../models");

// Create a new department
exports.createDepartment = async (req, res) => {
    try {
        const { name, location } = req.body;
        const department = await Department.create({ name, location });
        res.status(201).json(department);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Get all departments
exports.getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.findAll();
        res.status(200).json(departments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Get a single department by ID
exports.getDepartmentById = async (req, res) => {
    try {
        const department = await Department.findByPk(req.params.id);
        if (department) {
            res.status(200).json(department);
        } else {
            res.status(404).json({ message: "Department not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Update a department
exports.updateDepartment = async (req, res) => {
    try {
        const department = await Department.findByPk(req.params.id);
        if (department) {
            const { name, location } = req.body;
            await department.update({ name, location });
            res.status(200).json(department);
        } else {
            res.status(404).json({ message: "Department not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Delete a department
exports.deleteDepartment = async (req, res) => {
    try {
        const department = await Department.findByPk(req.params.id);
        if (department) {
            await department.destroy();
            res.status(200).json({ message: "Department deleted successfully" });
        } else {
            res.status(404).json({ message: "Department not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
