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

