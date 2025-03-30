module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define("Employee", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        salary: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: {
                msg: "Email must be a valid email address",
              },
            },
          },
    });

    return Employee;
};
