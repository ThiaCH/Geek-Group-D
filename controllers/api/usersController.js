const debug = require("debug")("mern:controllers:usersController");
const User = require("../../models/user");
const Attendance = require("../../models/attendance");
const Class = require("../../models/class");
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
function isPastNineAMInSingapore() {
  const now = new Date();

  // Singapore is UTC+8
  const singaporeOffset = 8 * 60; // Offset in minutes
  const localOffset = now.getTimezoneOffset(); // Local offset in minutes
  const singaporeTime = new Date(
    now.getTime() + (singaporeOffset - localOffset) * 60000,
  );

  // Extract hours and minutes from the Singapore time
  const hours = singaporeTime.getUTCHours();
  const minutes = singaporeTime.getUTCMinutes();

  // Check if the time is past 9:00 AM
  return hours > 9 || (hours === 9 && minutes > 0);
}

async function login(req, res) {
  // const dateChecker = new Date().toLocaleDateString("en-SG");

  // 1) Get user to check if user exist, if no return not found
  const user = await User.findOne({ email: req.body.email });
  if (user === null) {
    res.status(401).json({ msg: "User not found" });
  }

  // 2) check credentials if user is authorized => login
  const match = await bcrypt.compare(req.body.password, user.password);
  if (match) {
    const token = createJWT(user);
    res.json(token);
  } else {
    res.status(401).json({ msg: "Password incorrect" });
  }

  // 3) check  if user not admin, mark attendance

  if (!user.isAdmin) {
    // 4) if log in before 9am, don't need to log attendance
    if (isPastNineAMInSingapore()) {
      await Attendance.create({ studentInfo: user._id });
    }
    // 5) if user has logged in before, don't need to add attendance

    // if (loginTime > new Date().setHours(9, 0, 0, 0)) {
    //   const findById = await Attendance.find({ studentInfo: user._id });
    //   if (findById.length !== 0) {
    //     const findByDate = findById.find(
    //       (item) => item.checkinDate === dateChecker,
    //     );
    //     if (findByDate === undefined) {
    //       await Attendance.create({ studentInfo: user._id });
    //       // const attendance = new Attendance();
    //       // attendance.studentInfo = user._id;
    //       // await attendance.save();
    //       // user.AttendanceLog.push(attendance._id);
    //       // await user.save();
    //     }
    //   } else {
    //     // const attendance = new Attendance();
    //     // attendance.studentInfo = user._id;
    //     // await attendance.save();
    //     // user.AttendanceLog.push(attendance._id);
    //     // await user.save();
    //     await Attendance.create({ studentInfo: user._id });
    //   }
    // }
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

async function editOne(req, res) {
  try {
    const attendanceId = req.params.id;
    const attendanceUpdateData = { ...req.body };

    // If studentInfo update is present in req.body, handle the User update
    if (req.body.studentInfo) {
      const userId = req.body.studentInfo._id; // Assuming _id of User is provided in studentInfo
      const userUpdateData = req.body.studentInfo;

      // Update the User document
      await User.findByIdAndUpdate(userId, userUpdateData, {
        new: true,
        runValidators: true,
      });

      // Remove studentInfo from attendanceUpdateData to avoid overwriting the ObjectId reference
      delete attendanceUpdateData.studentInfo;
    }

    // Update the Attendance document
    const updatedAttendance = await Attendance.findByIdAndUpdate(
      attendanceId,
      attendanceUpdateData,
      { new: true },
    ).populate("studentInfo");

    res.status(201).json(updatedAttendance);
  } catch (error) {
    console.error(error);
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

const showClasses = async (req, res) => {
  const classes = await Class.find({});
  res.json(classes);
};

module.exports = {
  create,
  login,
  show,
  deleteOne,
  editOne,
  listAllStudents,
  updateStudent,
  showClasses,
};
