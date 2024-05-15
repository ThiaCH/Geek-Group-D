const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const attendanceSchema = new Schema(
  {
    studentInfo: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    checkinDate: {
      type: Date,
      default: function () {
        return new Date().toLocaleDateString("en-SG");
      },
    },
    checkinTime: {
      type: Date,
      default: function () {
        return new Date().toLocaleTimeString("en-SG");
      },
    },
    isAbsent: {
      type: Boolean,
      default: false,
    },
    qrCodeLink: {
      type: String,
      ref: "Admin",
    },
    reason: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Attendance", attendanceSchema);
