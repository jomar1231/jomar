const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const verifyToken = require("../middleware/authMiddle");

// Public route

router.post("/register", authController.register);
// Protected route - requires valid token
router.get("/user", verifyToken, (req,res)=>{
  res.json({message: "welcome to api", user: req.user});
});

module.exports = router;




