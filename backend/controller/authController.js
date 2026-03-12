const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

// Register
exports.register = async (req,res)=>{
  const { firstname,lastname, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  User.createUser({firstname,lastname,email,password:hashedPassword}, (err,result)=>{
    if(err) return res.status(500).json({message: err});
    res.json({message: "User registered successfully"});
  });
};



// Login
exports.login = (req,res)=>{
  const { email, password } = req.body;

  User.findUserByEmail(email, async (err,result)=>{
    if(err) return res.status(500).json({message: err});
    if(result.length === 0) return res.status(404).json({message:"User not found"});

    const user = result[0];
    const valid = await bcrypt.compare(password, user.password);
    if(!valid) return res.status(401).json({message:"Wrong password"});

    const token = jwt.sign({id:user.id,email:user.email},"secretkey",{expiresIn:"1h"});
    res.json({message:"Login successful", token});
  });
};