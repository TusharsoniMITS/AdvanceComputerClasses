const mongoose = require("mongoose");

const TextSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const TextModel = mongoose.model("TextModel", TextSchema);
module.exports = TextModel;
