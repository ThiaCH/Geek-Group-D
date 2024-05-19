const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/usersController");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Student = require("../../models/user");
const debug = require("debug")("mern:routes:usersRoute");

const SALT_ROUNDS = 6;

// POST /api/users - Create a new user
router.post("/", usersCtrl.create);

// POST /api/users/login - Login a user
router.post("/login", usersCtrl.login);

// Middleware to check token
const checkToken = (req, res, next) => {
  const header = req.get("Authorization");
  const token = header.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, process.env.SECRET);
    debug(payload.user);
    res.locals.user = payload.user;
    next();
  } catch (error) {
    res.status(401).json("Unauthorized");
  }
};

// GET /api/users/check-token - Check if token is valid
router.get("/check-token", checkToken, (req, res) => {
  const user = res.locals.user;
  res.json(user);
});

// PUT /api/users/update - Update student information
router.put("/update", async (req, res) => {
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

module.exports = router;
