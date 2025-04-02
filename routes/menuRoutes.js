const express = require("express");
const menuController = require("../controllers/menuController");

const router = express.Router();

// Get all menus
router.get("/", menuController.getAllMenus);
router.post("/", menuController.createMenu);

module.exports = router;
