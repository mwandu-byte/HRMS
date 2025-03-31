require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./models");
const employeeRoutes = require("./routes/employeeRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const payrollRoutes = require("./routes/payrollRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const nextOfKinRoutes = require("./routes/nextOfKinRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const performanceRoutes = require("./routes/performanceRoutes");

const app = express();

///middlewares
app.use(cors());
app.use(bodyParser.json());

//Routes

app.use("/api/employees", employeeRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/payrolls", payrollRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/nextOfKins", nextOfKinRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/performance", performanceRoutes);

//start server

const PORT = process.env.PORT || 5000;
db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running at http://127.0.0.1:${PORT}`)
    );
  })
  .catch((err) => console.error("Database connection error:", err));
