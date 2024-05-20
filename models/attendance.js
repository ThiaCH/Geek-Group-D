const mongoose = require("mongoose");

const Schema = mongoose.Schema;

Schema.Types.Boolean.convertToFalse.add("n/a");

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
        const newDate = new Date(
          Date.now() + 8 * 60 * 60 * 1000,
        ).toDateString();
        return newDate.split(" ")[0];
      },
    },
    checkinTime: {
      type: String,
      default: function () {
        const newTime = new Date(
          Date.now() + 8 * 60 * 60 * 1000,
        ).toTimeString();
        return newTime.split(" ").slice(1, 4).join(" ");
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
