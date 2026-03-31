import express from 'express';
const user = express.Router();
import { getAllUsers } from "../controller/userController.js";

user.get("/users", getAllUsers);

export default user;