const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const resourceSchema = new Schema(
  {
    id: {
      type: Number,
      trim: true,
      require: true,
    },
    website: {
      type: String,
      trim: true,
      require: true,
    },
    url: {
      weblink: String,
      trim: true,
      require: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Resource", resourceSchema);
