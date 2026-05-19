const UserModel = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {

  static signUp = async (req, res) => {
    try {
      const { name, email, password, confirmPassword } = req.body;
      // console.log(req.body);
      // Check if all fields are provided
      if (!name || !email || !password || !confirmPassword) {
        return res
          .status(400)
          .json({ status: "failed", message: "All fields are required!" });
      }
      // Check if password and confirm password match
      if (password !== confirmPassword) {
        return res
          .status(400)
          .json({ status: "failed", message: "Password doesn't match" });
      }
      // Check if the user already exists
      const existingUser = await UserModel.findOne({ email: email });
      if (existingUser) {
        return res
          .status(400)
          .json({ status: "failed", message: "Email already exists" });
      }
      // Hashing the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Create a new user
      const userData = await UserModel.create({
        name,
        email,
        password: hashedPassword,
      });
      // Generating token and storing in cookies
      const token = jwt.sign({ ID: userData._id }, process.env.JWT_SECRET);

      res.cookie("token", token, { httpOnly: true });
      // console.log(token)
      // Return the created user data or a success message
      return res.status(201).json({
        status: "success",
        message: "User registered successfully",
        data: userData,
        token
      });

    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ status: "failed", message: "Internal server error" });
    }
  };

  static signIn = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // ✅ Validate required fields
      if (!email || !password) {
        return res.status(400).json({ status: "failed", message: "Email and password are required." });
      }
  
      // ✅ Find user in database
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(401).json({ status: "failed", message: "You are not a registered user." });
      }
  
      // ✅ Verify password
      const isMatched = await bcrypt.compare(password, user.password);
      if (!isMatched) {
        return res.status(401).json({ status: "failed", message: "Invalid email or password." });
      }
  
      // ✅ Fetch role dynamically from MongoDB (default to "student")
      const userRole = user.role || "student";
  
      // ✅ Generate JWT Token with role
      const token = jwt.sign(
        { ID: user._id, role: userRole },
        process.env.JWT_SECRET || "default_secret",
        { expiresIn: "1d" }
      );
  
      // ✅ Set token in response cookies
      res.cookie("token", token, {
        httpOnly: true, // Prevents XSS attacks
        secure: process.env.NODE_ENV === "production", // Use HTTPS in production
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
  
      // ✅ Send Response
      return res.status(200).json({
        status: "success",
        message: "Login successful.",
        token,
        user: { _id: user._id, email: user.email, name: user.name, role: userRole },
      });
  
    } catch (error) {
      console.error("❌ Error during sign-in:", error);
      return res.status(500).json({ status: "failed", message: "Internal server error." });
    }
  };
  


  static logout = async (req, res) => {
    try {
      // Assuming the token is stored in a cookie, you don't need to log the token here
      res.status(201)
        .cookie('token', "", {
          httpOnly: true,
          expires: new Date(Date.now()), // Expire immediately
        })
        .json({
          success: true,
          message: "Logout Successfully",
        });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        status: "failed",
        message: error.message
      });
    }
  }


  static getUser = async (req, res) => {
    try {
      const { id } = req.UserData;
      // console.log(req.UserData)
      const data = await UserModel.findById(id);
      return res
        .status(200)
        .json({ status: "success", message: "user details found", data });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ status: "failed", message: "Internal server error." });
    }
  };

}
module.exports = UserController;
