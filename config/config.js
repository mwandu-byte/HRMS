require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "employee_dev",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: process.env.DB_DIALECT || "mysql",
  },
  production:{
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "employee_dev",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: process.env.DB_DIALECT || "mysql",
  }
};
