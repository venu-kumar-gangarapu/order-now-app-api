const Emps = require('../models/auth.model');
exports.getUsers = async (req,res)=>{
    try {
        const getAllUSers = await Emps.find();
        res.status(200).send(getAllUSers);
    } catch (error) {
        console.log("error");
    }
}