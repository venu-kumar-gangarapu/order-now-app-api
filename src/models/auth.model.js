const mongoose = require("mongoose");

const emps = new mongoose.Schema({
    name : String,
    EmId: Number
});

module.exports = mongoose.model("Emps",emps);