const Emps = require('../models/auth.model');
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const index = require('../config/index');

exports.login = async (req, res) => {
  const userName = req.body.username;
  const user = await Emps.findOne({ username: userName });
  if (!user) {
    res.status(401).json("Wrong username");
  } else {
    const decrept = CryptoJS.AES.decrypt(user.password, index.pass);
    const Password = decrept.toString(CryptoJS.enc.Utf8);
    const { password, ...others } = user._doc;
    if (Password !== req.body.password) {
      res.status(401).json("wrong password")
    } else {
      const acesstoken = jwt.sign({
        id: user._id,
        isAdmin: user.isAdmin,
        userName : user.username
      }, index.jwt, { expiresIn: "1d" });
      res.status(200).json({ ...others, acesstoken });
    }
  }
}

exports.register = async (req,res)=>{
    const passowrd = req.body.password;
    const cryptoEncrpt =CryptoJS.AES.encrypt(passowrd,index.pass).toString();
    const authData = new Emps({
        username:req.body.username,
        email:req.body.email,
        password:cryptoEncrpt,
    });
    try {
        const saving = await authData.save();
        res.status(200).json(saving);
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}