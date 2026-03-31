import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getAllUsers as getAllUsersModel } from "../models/userModels.js";

export const getAllUsers = async (req,res) =>{
  getAllUsersModel((err,result)=>{
    if(err){
      return res.status(500).json({message: "Database error: " + err});
    }
    res.json({database : "Users retrieved", user : result});
  });
};