const express = require("express");
const path = require("path");
const logger = require("morgan");
const debug = require("debug")("mern:server");

// Always require and configure near the top
require("dotenv").config();

// Connect to the database
require("./config/database");

const app = express();
const Student = require("./models/user"); // Import your Student model
const port = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(express.json());

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, "dist")));

// API routes
app.use("/api/users", require("./routes/api/usersRoute"));

// Add the students API route. Move this part to usersRouter
app.get("/api/students", async (req, res) => {
  const students = await Student.find({});
  res.json(students);
});

// The "catch all" route for SPA
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, function () {
  debug(`Express app running on port ${port}`);
});
