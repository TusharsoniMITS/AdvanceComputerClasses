const BlogModel = require("../model/BlogModel");
class BlogController {
  static InsertBlog = async (req, res) => {
    try {
      const { name, qualification, downloadLink, applyForm, importantDates } =
        req.body;
      const data = new BlogModel({
        name: name,
        qualification: qualification,
        downloadLink: downloadLink,
        applyForm: applyForm,
        importantDates: importantDates,
      });
      await data.save();
      res.status(201).json({
        status: "success",
        message: "Blog Added Successfully",
      });
    } catch (error) {
      res.send(error);
    }
  };

  static GetAllBlog = async (req, res) => {
    try {
      // Get all Blog
      const allBlog = await BlogModel.find();
      // console.log(allBlog)
      const blogCount = await BlogModel.countDocuments();
      res.status(201).json({
        status: true,
        allBlog,
        blogCount, // Return the count of messages
      });
    } catch (error) {
      res.send(error);
    }
  };

  static BlogView = async (req, res) => {
      try {
        const { id } = req.params;
        // console.log(req.UserData)
        const data = await BlogModel.findById(id);
        return res
          .status(200)
          .json({ status: "success", message: "Blog View By id successfully found", data });
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ status: "failed", message: "Internal server error." });
      }
    };

  static DeleteBlog = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json({ status: "failed", message: "Blog not found" });
      }
      await BlogModel.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ status: "success", message: "Blog deleted successfully" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ status: "failed", message: "Internal server error." });
    }
  };
}

module.exports = BlogController;
