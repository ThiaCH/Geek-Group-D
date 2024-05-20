const mongoose = require("mongoose");

const Schema = mongoose.Schema;

Schema.Types.Boolean.convertToFalse.add("n/a");

// Function to get the current date in Singapore time zone
const getSGDate = () => {
  const now = new Date();
  const singaporeTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Singapore" }),
  );
  return singaporeTime.toISOString().split("T")[0];
};

// Function to get the current time in Singapore time zone
const getSGTime = () => {
  const now = new Date();
  const singaporeTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Singapore" }),
  );
  return singaporeTime.toLocaleTimeString("en-US", {
    timeZone: "Asia/Singapore",
  });
};

const attendanceSchema = new Schema(
  {
    studentInfo: {
      type: Schema.Types.ObjectId,
      default: null,
      ref: "User",
    },
    checkinDate: {
      type: String,
      default: function () {
        return getSGDate();
      },
    },
    checkinTime: {
      type: String,
      default: function () {
        return getSGTime();
      },
    },
    isLate: {
      type: Boolean,
      default: false,
    },
    isAbsent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

attendanceSchema.pre("save", function (next) {
  // Compare this.checkinTime with 9:30:00 AM
  const currentTime = new Date();
  this.isAbsent = currentTime > new Date().setHours(9, 45, 0, 0);
  if (this.isAbsent === true) {
    this.isLate = false;
  } else {
    this.isLate = currentTime > new Date().setHours(9, 30, 0, 0);
  }
  next();
});

module.exports = mongoose.model("Attendance", attendanceSchema);
