const debug = require("debug")("mern:controllers:usersController");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Attendance = require("../../models/attendance");

const createJWT = (user) =>
  jwt.sign({ user }, process.env.SECRET, { expiresIn: "20m" });

async function create(req, res) {
  // const { name, email, password } = req.body;
  // const user = await User.create({ name, email, password });
  // res.status(201).json({user});
  try {
    const user = await User.create(req.body); // this calls the mongoose to create the data according to the user schema rules.
    // Baby step...
    const token = createJWT(user); // this calls the createJWT function defined above and pass the user data to it to perform jwt encode
    res.status(201).json(token);
    debug(req.body);
  } catch (err) {
    debug("error: %o", err);
    res.status(400).json(err);
  }
}

async function login(req, res) {
  const user = await User.findOne({ email: req.body.email });

  if (user === null) {
    res.status(401).json({ msg: "User not found" });
  }

  const match = await bcrypt.compare(req.body.password, user.password);

  if (match) {
    const token = createJWT(user);
    res.json(token);
  } else {
    res.status(401).json({ msg: "Password incorrect" });
  }
}

async function createAttendance(req, res) {
  try {
    const { studentId, checkinDate, checkinTime, isAbsent, reason } = req.body;

    const attendance = await Attendance.create({
      studentInfo: studentId,
      checkinDate,
      checkinTime,
      isAbsent,
      reason,
    });

    res.status(201).json(attendance);
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({
        message: "Failed to create attendance record",
        error: err.message,
      });
  }
}

module.exports = {
  create,
  login,
  createAttendance,
};
