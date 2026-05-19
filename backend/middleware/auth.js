const jwt = require("jsonwebtoken");
const UserModel = require("../model/UserModel");

const verifyToken = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(401).json({ status: "failed", message: "Unauthorized Login!" });
  } else {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const userData = await UserModel.findOne({ _id: data.ID });//id uth kr aayehi issi se token bana hai
    req.UserData = userData;
    next();
  }
};
module.exports = verifyToken;
