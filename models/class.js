const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const classSchema = new Schema(
  {
    className: {
      type: String,
      required: true,
      unique: true,
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    startDate: {
      type: Date,
      default: function () {
        return new Date();
      },
    },
    endDate: {
      type: Date,
      default: function () {
        return new Date();
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Class", classSchema);
