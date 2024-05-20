const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Class = require("./class");

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
      uppercase: true,
      required: true,
      set: function (value) {
        return value.replace(/\s+/g, "");
      },
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

userSchema.pre("findOneAndUpdate", async function (next) {
  if (this._update.password) {
    this._update.password = await bcrypt.hash(
      this._update.password,
      SALT_ROUNDS,
    );
  }
  next();
});

userSchema.post("save", async function (doc, next) {
  try {
    const classDoc = await Class.findOne({ className: doc.class });
    if (classDoc) {
      if (!classDoc.students.includes(doc._id)) {
        classDoc.students.push(doc._id);
        await classDoc.save();
      }
    } else {
      await Class.create({
        className: doc.class,
        students: [doc._id],
      });
    }
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("User", userSchema);
