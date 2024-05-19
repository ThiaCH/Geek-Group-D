const express = require("express");
const path = require("path");
const logger = require("morgan");
const debug = require("debug")("mern:server");
const cors = require("cors");
const bcrypt = require("bcrypt"); //* New Codes

// Always require and configure near the top
require("dotenv").config();

// Connect to the database
require("./config/database");

const app = express();
const Student = require("./models/user"); // Import your Student model
const SALT_ROUNDS = 6; //* New Codes
const port = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(cors());
app.use(express.json());

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, "dist")));

// API routes
app.use("/api/users", require("./routes/api/usersRoute"));

//* GET route to retrieve all students // New Codes
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find({});
    res.json(students);
  } catch (error) {
    console.error("Error retrieving students:", error);
    res.status(500).send("Failed to get students");
  }
});

//* PUT route to update a student // New Codes
app.put("/api/students", async (req, res) => {
  const { email, name, contactNumber, password } = req.body;

  try {
    const updatedData = { name, contact: contactNumber };

    if (password) {
      updatedData.password = await bcrypt.hash(password, SALT_ROUNDS);
    }

    const updatedStudent = await Student.findOneAndUpdate(
      { email: email },
      updatedData,
      { new: true, runValidators: true, context: "query" },
    );

    if (!updatedStudent) {
      return res.status(404).send("Student not found");
    }

    res.json(updatedStudent);
  } catch (error) {
    console.error("Failed to update student:", error);
    res.status(500).send(`Update failed: ${error.message}`);
  }
});

// The "catch all" route for SPA
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, function () {
  debug(`Express app running on port ${port}`);
});
