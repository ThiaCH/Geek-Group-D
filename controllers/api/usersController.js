const debug = require("debug")("mern:controllers:usersController");
const User = require("../../models/user");
const Attendance = require("../../models/attendance");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createJWT = (user) =>
  jwt.sign({ user }, process.env.SECRET, { expiresIn: "20m" });

async function create(req, res) {
  try {
    const user = await User.create(req.body); // this calls the mongoose to create the data according to the user schema rules.
    const token = createJWT(user); // this calls the createJWT function defined above and pass the user data to it to perform jwt encode
    res.status(201).json(token);
    debug(req.body);
  } catch (err) {
    debug("error: %o", err);
    res.status(400).json(err);
  }
}

async function login(req, res) {
  const dateChecker = new Date().toLocaleDateString("en-SG");

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

  // create attendance record as student logs in
  if (!user.isAdmin) {
    const loginTime = new Date();
    if (loginTime > new Date().setHours(9, 0, 0, 0)) {
      const findById = await Attendance.find({ studentInfo: user._id });
      if (findById.length !== 0) {
        const findByDate = findById.find(
          (item) => item.checkinDate === dateChecker,
        );
        if (findByDate === undefined) {
          const attendance = new Attendance();
          attendance.studentInfo = user._id;
          await attendance.save();
          user.AttendanceLog.push(attendance._id);
          await user.save();
        }
      } else {
        const attendance = new Attendance();
        attendance.studentInfo = user._id;
        await attendance.save();
        user.AttendanceLog.push(attendance._id);
        await user.save();
      }
    }
  }
}

async function show(req, res) {
  try {
    const attendanceRecords = await Attendance.find({}).populate("studentInfo");
    debug(attendanceRecords);
    res.json(attendanceRecords);
  } catch (error) {
    debug(error);
    res.status(400).json({ msg: "Records not found" });
  }
}

async function deleteOne(req, res) {
  try {
    const deletedAttendance = await Attendance.findByIdAndDelete(req.params.id);
    debug("Attendance deleted:\n", deletedAttendance);
    const student = await User.findOne({ AttendanceLog: req.params.id });
    debug("Target student:\n", student);
    await student.AttendanceLog.remove(req.params.id);
    await student.save();
    res.status(204).json(null);
  } catch (error) {
    debug(error);
    res.status(400).json(error);
  }
}

// GET route to retrieve all students
async function listAllStudents(req, res) {
  try {
    const students = await User.find({ isAdmin: false });
    res.json(students);
  } catch (error) {
    console.error("Error retrieving students:", error);
    res.status(500).send("Failed to get students");
  }
}

async function updateStudent(req, res) {
  const { id, email, name, contact } = req.body;
  try {
    const updatedData = { name, contact, email };

    // if (password) {
    //   updatedData.password = await bcrypt.hash(password, SALT_ROUNDS);
    // }

    const updatedStudent = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
      context: "query",
    });
    console.log("updated", updateStudent);

    if (!updatedStudent) {
      return res.status(404).send("Student not found");
    }

    res.json(updatedStudent);
  } catch (error) {
    console.error("Failed to update student:", error);
    res.status(500).send(`Update failed: ${error.message}`);
  }
}

module.exports = {
  create,
  login,
  show,
  deleteOne,
  listAllStudents,
  updateStudent,
};
