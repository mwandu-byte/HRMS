'use strict';

const { Model } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('Payrolls',{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey:true,
        type: Sequelize.INTEGER

      },
      employeeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
          Model: 'Employees',
          key: 'id'

        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      basicSalary: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      bonuses: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      deductions: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      netPay: {
        type: Sequelize.FLOAT,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }

    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('Payrolls');
  }
};
