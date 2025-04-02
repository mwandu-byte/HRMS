const { Menu } = require("../models");

// Get all menus
exports.getAllMenus = async (req, res) => {
    try {
        const menus = await Menu.findAll();
        res.status(200).json(menus);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
// Create a new menu
exports.createMenu = async (req, res) => {
    try {
        const { name, icon, link, parentId } = req.body;

        // Create menu
        const menu = await Menu.create({
            name,
            icon,
            link,
            parentId: parentId || null, // Inaruhusu kuwa submenu ikiwa parentId imewekwa
        });

        res.status(201).json(menu);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


