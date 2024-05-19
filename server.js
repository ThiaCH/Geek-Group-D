const express = require("express");
const path = require("path");
const logger = require("morgan");
const debug = require("debug")("mern:server");
// const bcrypt = require("bcrypt"); // For password hashing

// Always require and configure near the top
require("dotenv").config();

// Connect to the database
require("./config/database");

const app = express();
// const Student = require("./models/user"); // Import your Student model
// const SALT_ROUNDS = 6; // Number of bcrypt salt rounds
const port = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(express.json());

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, "dist")));

// API routes
app.use("/api/users", require("./routes/api/usersRoute"));

// The "catch all" route for SPA
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, function () {
  debug(`Express app running on port ${port}`);
});
