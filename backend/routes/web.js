const express = require("express");
const verifyToken = require("../middleware/auth");
const UserController = require("../Controllers/UserController");
const TextController = require("../Controllers/TextController");
const TextHindiController = require("../Controllers/HindiTextControlller");
const CourseController = require("../Controllers/CourseController");
const BlogController = require("../Controllers/BlogController");
const ContactController = require("../Controllers/ContactController");
const router = express.Router();

//User Routes
router.post("/signUp", UserController.signUp);
router.post("/signIn", UserController.signIn);
router.get("/getUser",verifyToken, UserController.getUser);
router.post("/logout",verifyToken,UserController.logout)

//Message English ROUTES
router.post("/insertText",verifyToken, TextController.InsertText);
router.get("/getAllText", TextController.GetAllText);
router.delete("/DeleteText/:id",verifyToken, TextController.DeleteText);

//Message Hindi ROUTES
router.post("/insertHindiText",verifyToken, TextHindiController.InsertHindiText);
router.get("/getAllHindiText", TextHindiController.GetAllHindiText);
router.delete("/DeleteHindiText/:id",verifyToken, TextHindiController.DeleteHindiText);

// Course ROUTES
router.post("/insertCourse", CourseController.InsertCourse);
router.get("/getAllCourse", CourseController.GetAllCourse);
router.get("/getNumberCourse", CourseController.GetNumberCourse);
router.delete("/DeleteCourse/:id", CourseController.DeleteCourse);
router.put("/updatecourse/:id",CourseController.updateCourse)

// Blog ROUTES
router.post("/insertBlog", BlogController.InsertBlog);
router.get("/getAllBlog", BlogController.GetAllBlog);
router.get("/blogview/:id",BlogController.BlogView);
router.delete("/deleteBlog/:id", BlogController.DeleteBlog);


// Contact Controller
router.post("/insertcontact", ContactController.InsertMessage);
router.get("/getallmessage",ContactController.GetAllMessage)

module.exports = router;