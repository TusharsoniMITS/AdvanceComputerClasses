const TextModel = require("../model/TextModel");
class TextController {
  static InsertText = async (req, res) => {
    try {
      const { text } = req.body;
      const data = new TextModel({
        text: text,
      });
      await data.save();
      res.status(201).json({
        status: "success",
        message: "Text Sent Successfully",
      });
    } catch (error) {
      res.send(error);
    }
  };
  static GetAllText = async (req, res) => {
    try {
      // Get all messages
      const allMessage = await TextModel.find();
      // Count the number of messages
      const messageCount = await TextModel.countDocuments();
      res.status(201).json({
        status: true,
        allMessage,
        messageCount, // Return the count of messages
      });
    } catch (error) {
      res.send(error);
    }
  };
  static DeleteText = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json({ status: "failed", message: "Text not found" });
      }
      await TextModel.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ status: "success", message: "Text deleted successfully" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ status: "failed", message: "Internal server error." });
    }
  };
}

module.exports = TextController;
