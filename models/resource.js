const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const resourceSchema = new Schema(
  {
    website: {
      type: String,
      require: true,
    },
    url: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Resource", resourceSchema);
