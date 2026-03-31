
//this folder for logic
import 'dotenv/config';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail, products as getProducts } from "../models/userModels.js";

export const register = async (req,res)=>{
  const { firstname, lastname, email, password } = req.body;
  if(!firstname || !lastname || !email || !password) {
    return res.status(400).json({message: "All fields are required"});
  }
  if(password.length < 6) {
    return res.status(400).json({message: "Password must be at least 6 characters"});
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    createUser({firstname, lastname, email, password: hashedPassword}, (err,result)=>{
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
export const login = (req,res)=>{
  const { email, password } = req.body;
  if(!email || !password) {
    return res.status(400).json({message:"Email and password are required"});
  }
  findUserByEmail(email, async (err,result)=>{
    if(err) return res.status(500).json({message: "Database error: " + err});
    if(!result || result.length === 0) return res.status(404).json({message:"Your Email is Not Exist!"});

    const user = result[0];
    try {
      const valid = await bcrypt.compare(password, user.password);
      if(!valid) return res.status(401).json({message:"Wrong password"});
      const token = jwt.sign({id:user.id, email:user.email, firstname:user.firstname}, process.env.JWT_SECRET || "secretkey",{expiresIn:"1h"});

      // Set auth token as secure HTTP-only cookie
      res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 1000 // 1 hour
      });


      return res.status(200).json({
        message: "Login successful",
        user: {id: user.id,
         email: user.email, firstname: user.firstname}
      });
    } catch(err) {
      return res.status(500).json({message: "Authentication error: " + err});
    }
  });
};


export const products = (req,res) =>{
  getProducts((err, result) =>{
    if(err){
      return res.status(404).json({message : " NO PRODUCTS"});
    }
    res.json({ products: result });
  });
};

export const logout = (req, res) => {
  res.clearCookie('authToken');
  res.json({ message: 'Logged out successfully' });
};
