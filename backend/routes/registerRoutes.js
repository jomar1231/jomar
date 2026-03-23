const express = require("express");
const register = express.Router();
const authController = require("../controller/authController");
const verifyToken = require("../middleware/authMiddle");

// Public route

register.post("/register", authController.register,verifyToken);
// Protected route - requires valid token
register.get("/user", verifyToken, (req,res)=>{
  res.json({message: "welcome to api", user: req.user});
});

module.exports = register;




