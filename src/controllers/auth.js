const Emps = require('../models/auth.model');
const jwt = require('jsonwebtoken');


exports.login = async (req,res)=>{
  const findUser = await Emps.findOne({name : req.body.name});
  if(findUser.EmId === req.body.EmId){
    const acesstoken =jwt.sign({id:findUser.EmId,name:findUser.name},'MadMax',{expiresIn:"1d"});
    console.log(req.body.name);
    res.send({acesstoken});
  }
  res.send('already present');
}