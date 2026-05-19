const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    password :{
        type: String,
        required: true,
        default:"student",
    },

}, { timestamps: true });

const UserModel = mongoose.model("User.model", UserSchema);
module.exports = UserModel;
