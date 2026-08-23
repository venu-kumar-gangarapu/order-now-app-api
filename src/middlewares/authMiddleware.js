const jsonverify = require('jsonwebtoken');
const { jwt } = require("../config");

exports.userMiddlware = (req,res,next)=>{    
    const token = req.headers.authorization?.split(" ")[1];
    if(token){
        const decoded = jsonverify.verify(token,jwt);
        req.user = decoded.userName;
        next();
    }
    else{
        return res.status(400).send({message : 'Not authorized'});
    }
}