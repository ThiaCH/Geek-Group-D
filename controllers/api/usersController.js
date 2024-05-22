const debug = require("debug")("mern:controllers:usersController");
const User = require("../../models/user");
const Attendance = require("../../models/attendance");
const Class = require("../../models/class");
const LoginId = require("../../models/loginid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createJWT = (user) =>
  jwt.sign({ user }, process.env.SECRET, { expiresIn: "20m" });

async function create(req, res) {
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

const createLoginId = async (req, res) => {
  try {
    const loginId = await LoginId.create(req.body);
    if (!loginId) {
      return res.status(400).json({ message: "loginId is required" });
    }
    res.status(201).json(loginId);
  } catch (error) {
    console.error("Error creating login ID:", error);
    res.status(500).json({ message: "Failed to create login ID" });
  }
};

const checkLoginId = async (req, res) => {
  try {
    const { loginId } = req.params;
    // Check if the loginId exists in the database
    const idExists = await LoginId.exists({ loginId });
    if (idExists) {
      return res.status(200).json({ isValid: true });
    } else {
      return res.status(404).json({ isValid: false });
    }
  } catch (error) {
    console.error("Error checking login ID:", error);
    return res.status(500).json({ isValid: false });
  }
};

async function login(req, res) {
  const date = new Date().toDateString();
  const dateChecker = date.split(" ").slice(1).join(" ");

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
    const loginTime = Date.parse(new Date());
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

async function loginNoAtt(req, res) {
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

async function createAttendance(req, res) {
  const studentName = req.body.name;
  const className = req.body.class;
  const date = new Date().toDateString();
  const dateChecker = date.split(" ").slice(1).join(" ");
  try {
    const student = await User.findOne({ name: studentName, class: className });
    if (student === null) {
      res.status(401).json({ msg: "User not found" });
    } else {
      const findById = await Attendance.find({ studentInfo: student._id });
      if (findById.length !== 0) {
        const findByDate = findById.find(
          (item) => item.checkinDate === dateChecker,
        );
        if (findByDate === undefined) {
          const attendance = new Attendance();
          attendance.studentInfo = student._id;
          await attendance.save();
          const attendanceInfo = await Attendance.findById(
            attendance._id,
          ).populate("studentInfo");
          student.AttendanceLog.push(attendance._id);
          await student.save();
          res.status(201).json(attendanceInfo);
        } else {
          res.status(401).json({ msg: "Attendance already exists" });
        }
      } else {
        const attendance = new Attendance();
        attendance.studentInfo = student._id;
        await attendance.save();
        const attendanceInfo = await Attendance.findById(
          attendance._id,
        ).populate("studentInfo");
        student.AttendanceLog.push(attendance._id);
        await student.save();
        res.status(201).json(attendanceInfo);
      }
    }
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
  const {
    id,
    name,
    email,
    contact,
    emergencyContactPerson,
    emergencyContactNumber,
  } = req.body;
  try {
    const updatedData = {
      name,
      email,
      contact,
      emergencyContactPerson,
      emergencyContactNumber,
    };

    //* For Future Upgrade
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
  loginNoAtt,
  show,
  deleteOne,
  editOne,
  createAttendance,
  listAllStudents,
  updateStudent,
  showClasses,
  createLoginId,
  checkLoginId,
};
