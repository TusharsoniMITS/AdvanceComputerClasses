const ContactModel = require("../model/ContactModel");
class ContactController {
  static InsertMessage = async (req, res) => {
    try {
      const { name, email, city,address, message } = req.body;
      const data = new ContactModel({
        name: name,
        city:city,
        address:address,
        email: email,
        message: message,
      });
      await data.save();
      res.status(201).json({
        status: "success",
        message: "Message Sent Successfully",
      });
    } catch (error) {
      res.send(error);
    }
  };
  static GetAllMessage = async (req, res) => {
    try {
      // Get all messages
      const allMessage = await ContactModel.find();
      // Count the number of messages
      const messageCount = await ContactModel.countDocuments();
      res.status(201).json({
        status: true,
        allMessage,
        messageCount, // Return the count of messages
      });
    } catch (error) {
      res.send(error);
    }
  };
}

module.exports = ContactController;
