const express = require("express");
const cors = require("cors");
const testRoutes = require("./routes/test.routes");
const authRoutes = require("./routes/auth.routes");
const groupRoutes = require("./routes/group.routes");
const expenseRoutes = require("./routes/expense.routes");
const importRoutes = require("./routes/import.routes");
const importIssueRoutes = require("./routes/importIssue.routes");
const importProcessRoutes =require("./routes/importProcess.routes");
const dashboardRoutes =require("./routes/dashboard.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/test", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/import", importRoutes);

app.use("/api/import/issues",importIssueRoutes);
app.use(
  "/api/import",
  importProcessRoutes
);
app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.get("/", (req, res) => {
  res.send("Shared Expenses API Running");
});

module.exports = app;