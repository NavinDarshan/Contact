const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    text: String,
    number : Number,
    email : String,
    username: String,
    toShow : Boolean
})

module.exports = mongoose.model("note", todoSchema);