const mongoose = require("mongoose");

const emps = new mongoose.Schema({
    username : String,
    email: String,
    password:String
});

module.exports = mongoose.model("Emps",emps);