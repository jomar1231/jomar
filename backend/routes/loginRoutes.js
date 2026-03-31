import express from "express";
const login = express.Router();
import { login as loginController, logout } from "../controller/authController.js";
import verifyToken from "../middleware/authMiddle.js";

// Public route
login.post("/login", loginController);

// Protected routes
login.get("/profile", verifyToken, (req,res)=>{
  res.json({message: "Profile accessed", user: req.user});
});

login.post("/logout", verifyToken, logout);

export default login;
