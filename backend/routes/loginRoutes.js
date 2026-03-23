const express = require("express");
const login = express.Router();
const authController = require("../controller/authController");
const verifyToken = require("../middleware/authMiddle");

// Public route
login.post("/login", authController.login, verifyToken);

// Protected route - requires valid token
login.get("/profile", verifyToken, (req,res)=>{
  res.json({message: "Profile accessed", user: req.user});
});

module.exports = login;
