'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    static associate(models) {
      // Define association with Employee model
      Attendance.belongsTo(models.Employee, { foreignKey: 'employeeId' });
    }
  }
  Attendance.init(
    {
      employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Employees', // Employee table
          key: 'id',
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('Present', 'Absent', 'On Leave'),
        allowNull: false,
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: true, // Reason is optional, used for "On Leave" or "Absent"
      },
    },
    {
      sequelize,
      modelName: 'Attendance',
      tableName: 'Attendances', // Specify table name if different
    }
  );
  return Attendance;
};
