const mongoose = require("mongoose");
// Add the bcrypt library
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const SALT_ROUNDS = 6;

const userSchema = new Schema(
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
    AttendanceLog: [
      {
        type: Schema.Types.ObjectId,
        ref: "Attendance",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  },
);

userSchema.pre("save", async function (next) {
  // 'this' is the user doc
  if (!this.isModified("password")) return next();
  // update the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

module.exports = mongoose.model("User", userSchema);
