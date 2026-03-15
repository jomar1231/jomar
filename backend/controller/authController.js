
//this folder for logic
require('dotenv').config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

exports.getAllUsers = async (req,res) =>{
  User.getAllUsers((err,result)=>{
    if(err){
      return res.status(500).json({message: "Database error: " + err});
    }
    res.json({database : "Users retrieved", user : result});
  });
};

// Register
exports.register = async (req,res)=>{
  const { firstname, lastname, email, password } = req.body;
  
  if(!firstname || !lastname || !email || !password) {
    return res.status(400).json({message: "All fields are required"});
  }
  
  if(password.length < 6) {
    return res.status(400).json({message: "Password must be at least 6 characters"});
  }
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    User.createUser({firstname, lastname, email, password: hashedPassword}, (err,result)=>{
      if(err) {
        if(err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({message: "Email already registered"});
        }
        return res.status(500).json({message: "Database error: " + err});
      }
      res.json({message: "User registered successfully"});
    });
  } catch(err) {
    return res.status(500).json({message: "Registration error: " + err});
  }
};



// Login
exports.login = (req,res)=>{
  const { email, password } = req.body;
  
  if(!email || !password) {
    return res.status(400).json({message:"Email and password are required"});
  }

  User.findUserByEmail(email, async (err,result)=>{
    if(err) return res.status(500).json({message: "Database error: " + err});
    if(!result || result.length === 0) return res.status(404).json({message:"User not found"});

    const user = result[0];
    try {
      const valid = await bcrypt.compare(password, user.password);
      if(!valid) return res.status(401).json({message:"Wrong password"});
      const token = jwt.sign({id:user.id, email:user.email, firstname:user.firstname}, process.env.JWT_SECRET || "secretkey",{expiresIn:"1h"});
      res.json({message:"Login successful", token, user: {id: user.id, email: user.email, firstname: user.firstname}});
    } catch(err) {
      return res.status(500).json({message: "Authentication error: " + err});
    }
  });
};
