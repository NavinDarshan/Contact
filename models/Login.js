const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const loginSchema = new mongoose.Schema({
    username : String,
    password : String
})
loginSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Login" , loginSchema)