const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 6;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      minLength: 3,
      required: true,
    },
    contact: {
      type: Number,
      min: 30000000,
      max: 99999999,
      required: true,
    },
    class: {
      type: String,
      required: true,
    },
    emergencyContactPerson: {
      type: String,
      required: true,
    },
    emergencyContactNumber: {
      type: Number,
      min: 30000000,
      max: 99999999,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    AttendanceLog: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attendance",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.isAdmin;
        return ret;
      },
    },
  },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

module.exports = mongoose.model("User", userSchema);
