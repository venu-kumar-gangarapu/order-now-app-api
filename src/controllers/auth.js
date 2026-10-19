const Emps = require('../models/auth.model');
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const index = require('../config/index');
const sendMail = require('../utils/mails');

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
    const emailExists = await Emps.findOne({ email: req.body.email });
    if (emailExists) {
      return res.status(409).send({ message: "Email already in use", success: false });
    }

    const usernameExists = await Emps.findOne({ username: req.body.username });
    if (usernameExists) {
      return res.status(409).send({ message: "Username already taken", success: false });
    }
    const authData = new Emps({
        username:req.body.username,
        email:req.body.email,
        password:cryptoEncrpt,
    });
    try {
        await authData.save();
        //await sendMail(req.body.email,req.body.username)
        res.status(200).json({message:"Account created succefully",success : true});
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}