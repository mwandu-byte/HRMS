'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Performance extends Model {
    static associate(models) {
      // A performance record belongs to an employee
      Performance.belongsTo( models.Employee, { foreignKey: "employeeId", as: "employee" });
    }
  }
  Performance.init(
    {
      employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      performance_rating: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      review_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
     
      feedback: {
        type: DataTypes.STRING,
        allowNull: false
      },
      comments: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'Performance'
    }
  );
  return Performance;
};
