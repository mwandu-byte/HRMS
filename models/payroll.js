"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payroll extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payroll.belongsTo(models.Employee, { foreignKey: "employeeId" });

      models.Employee.hasMany(Payroll, { foreignKey: "employeeId" });
    }
  }
  Payroll.init(
    {
      employeeId: DataTypes.INTEGER,
      basicSalary: DataTypes.FLOAT,
      bonuses: DataTypes.FLOAT,
      deductions: DataTypes.FLOAT,
      netPay: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Payroll",
    }
  );
  return Payroll;
};
