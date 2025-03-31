const { Performance, Employee } = require("../models");

// Create a new performance record
exports.createPerformance = async (req, res) => {
    try {
        const { employeeId, review_date, performance_rating, feedback, comments } = req.body;

        // Create a new performance record
        const performance = await Performance.create({
            employeeId,
            review_date,
            performance_rating,
            feedback,
            comments,
        });

        res.status(201).json(performance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Get all performance records
exports.getAllPerformance = async (req, res) => {
    try {
        const performances = await Performance.findAll({
            include: [
                {
                    model: Employee,  // Include employee details in the result
                    as: 'employee',   // Alias to match the association defined
                }
            ]
        });
        res.status(200).json(performances);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Get performance record by employee
exports.getPerformanceByEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const performance = await Performance.findAll({
            where: { employeeId },
            include: [
                {
                    model: Employee,
                    as: 'employee',  // Alias to match the association
                }
            ]
        });

        if (performance.length > 0) {
            res.status(200).json(performance);
        } else {
            res.status(404).json({ message: "No performance records found for this employee" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Update a performance record
exports.updatePerformance = async (req, res) => {
    try {
        const { id } = req.params;
        const { review_date, performance_rating, feedback, comments } = req.body;

        const performance = await Performance.findByPk(id);

        if (performance) {
            // Update performance record
            await performance.update({
                review_date,
                performance_rating,
                feedback,
                comments,
            });

            res.status(200).json(performance);
        } else {
            res.status(404).json({ message: "Performance record not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Delete a performance record
exports.deletePerformance = async (req, res) => {
    try {
        const { id } = req.params;
        const performance = await Performance.findByPk(id);

        if (performance) {
            // Delete performance record
            await performance.destroy();
            res.status(200).json({ message: "Performance record deleted successfully" });
        } else {
            res.status(404).json({ message: "Performance record not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
