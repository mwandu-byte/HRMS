"use strict";

const { link } = require('../routes/menuRoutes');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Menus",
      [
        {
          name: "Dashboard",
          icon: "dashboard", // Example icon name
          link: "/dashboard",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Employees",
          icon: "users",
          link: "/employees",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Departments",
          icon: "building",
          link: "/departments",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Payroll",
          icon: "money",
          link: "/payroll",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Leave",
          icon: "calendar",
          link: "/leaves",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Attendance",
          icon: "clock",
          link: "/attendance",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Performance",
          icon: "chart-line",
          link: "/performance",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Menus", null, {});
  },
};
