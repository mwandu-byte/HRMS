"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define the relationship with the Department model
      Employee.belongsTo(models.Department, {
        foreignKey: "departmentId",
        as: "department", // Alias for the relation
      });

      // Relationship with NextOfKin
      Employee.hasOne(models.NextOfKin, {
        foreignKey: "employeeId",
        as: "nextOfKin", // Alias for the relation
      });

      Employee.hasMany(models.Payroll, {
        foreignKey: "employeeId",
        as: "payroll", // Alias for the relation
      });
    }
  }

  Employee.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      dob: DataTypes.DATE,
      contact: DataTypes.STRING,
      email: DataTypes.STRING,
      position: DataTypes.STRING,
      departmentId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Departments", // Referencing Departments table
          key: "id", // Referencing the primary key of Departments table
        },
      },
    },
    {
      sequelize,
      modelName: "Employee",
    }
  );

  return Employee;
};
