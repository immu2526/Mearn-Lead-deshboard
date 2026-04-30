let mongoose = require("mongoose");

let leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    mobile: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    service: {
      type: String,
      require: true,
    },
    budget: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
      enum: ["New", "Interested", "Converted", "Rejected"],
      default: "New",
    },
  },
  { timestamps: true }
);

let lead = mongoose.model("lead", leadSchema);

module.exports = lead;
