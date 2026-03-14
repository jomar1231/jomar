const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const verifyToken = require("../middleware/authMiddle");

// Public route
router.post("/login", authController.login);

// Protected route - requires valid token
router.get("/profile", verifyToken, (req,res)=>{
  res.json({message: "Profile accessed", user: req.user});
});

module.exports = router;
