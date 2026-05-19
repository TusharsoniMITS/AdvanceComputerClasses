const CourseModel = require("../model/Course");
const cloudinary = require("cloudinary").v2;
class CourseController {

  static InsertCourse = async (req, res) => {
    try {
      //   console.log(req.files)
      const file = req.files.image;
      const myCloud = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "CourseImage",
      });

      const { title, duration, price } = req.body;
      const data = new CourseModel({
        title: title,
        duration: duration,
        price: price,
        image: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
      });
      await data.save();
      res.status(200).json({
        status: "success",
        message: "Course added Successfully",
      });
    } catch (error) {
      res.send(error);
    }
  };

  static GetAllCourse = async (req, res) => {
    try {
      // Get all course
      const allCourse = await CourseModel.find();
      // Count the number of course
      const courseCount = await CourseModel.countDocuments();
      res.status(201).json({
        status: true,
        allCourse,
        courseCount, // Return the count of course
      });
    } catch (error) {
      res.send(error);
    }
  };

  static updateCourse= async (req, res)=> {
    try {
      const { id } = req.params;
      const { title, duration, price } = req.body;

      // Validate input
      if (!title || !duration || !price) {
        return res.status(400).json({ status: "failed", message: "All fields are required." });
      }

      // Find and update the course (excluding image)
      const updatedCourse = await CourseModel.findByIdAndUpdate(
        id,
        { title, duration, price }, // Do not update image
        { new: true, runValidators: true }
      );

      if (!updatedCourse) {
        return res.status(404).json({ status: "failed", message: "Course not found." });
      }

      return res.status(200).json({
        status: "success",
        message: "Course updated successfully!",
        updatedCourse,
      });
    } catch (error) {
      console.error("Error updating course:", error);
      return res.status(500).json({ status: "failed", message: "Internal server error." });
    }
  }

  static GetNumberCourse = async (req, res) => {
    try {
      // Get the 3 most recent courses
      const recentCourses = await CourseModel.find();

      res.status(200).json({
        status: true,
        recentCourses, // Return only the last 3 courses
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static DeleteCourse = async (req, res) => {
    try {
      const { id } = req.params;
      const course = await CourseModel.findById(id);

      if (!course) {
        return res.status(404).json({
          status: "error",
          message: "Course not found",
        });
      }

      // Delete image from Cloudinary
      await cloudinary.uploader.destroy(course.image.public_id);

      // Remove course from database
      await CourseModel.findByIdAndDelete(id);

      res.status(200).json({
        status: "success",
        message: "Course deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };

}

module.exports = CourseController;
