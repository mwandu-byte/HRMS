"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    //   Payroll.belongsTo(models.Employee, { foreignKey: "employeeId", as: "employees" });

    //   // models.Employee.hasMany(Payroll, { foreignKey: "employeeId" });
    // }
  }
  Menu.init(
    {
      name: DataTypes.STRING,
      icon: DataTypes.STRING,
      link: DataTypes.STRING,
      parentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Menu",
    }
  );
  return Menu;
};
