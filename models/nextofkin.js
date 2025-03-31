'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NextOfKin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // In NextOfKin model
NextOfKin.belongsTo(models.Employee, { foreignKey: 'employeeId', as: 'employee' });

    }
  }
  NextOfKin.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    relationship: DataTypes.STRING,
    contact: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'NextOfKin',
  });
  return NextOfKin;
};