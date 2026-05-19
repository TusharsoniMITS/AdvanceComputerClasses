const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    downloadLink: {
      type: String,
      required: true,
    },
    applyForm: {
      type: String,
      required: true,
    },
    importantDates: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const BlogModel = mongoose.model("BlogModel", BlogSchema);
module.exports = BlogModel;
