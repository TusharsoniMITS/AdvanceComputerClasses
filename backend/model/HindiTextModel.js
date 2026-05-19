const mongoose = require("mongoose");

const TextSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const TextHindiModel = mongoose.model("HindiTextModel", TextSchema);
module.exports = TextHindiModel;
