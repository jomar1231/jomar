import express from "express";
const register = express.Router();
import { register as registerController } from "../controller/authController.js";
import verifyToken from "../middleware/authMiddle.js";

// Public route
register.post("/register", registerController);
register.get("/user", verifyToken, (req,res)=>{
  res.json({message: "welcome to api", user: req.user});
});

export default register;




