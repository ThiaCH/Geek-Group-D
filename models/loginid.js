const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const loginIdSchema = new Schema(
  {
    loginId: {
      type: String,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("loginid", loginIdSchema);
