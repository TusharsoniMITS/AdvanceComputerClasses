const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      Required: true,
    },
    email: {
      type: String,
      Required: true,
    },
    city: {
      type: String,
      Required: true,
    },
    address: {
      type: String,
      Required: true,
    },
    message: {
      type: String,
      Required: true,
    },
  },
  { timestamps: true }
);
const ContactModel = mongoose.model("ContactModel", ContactSchema);

module.exports = ContactModel;
