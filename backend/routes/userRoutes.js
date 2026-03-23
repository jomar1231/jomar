const express = require('express');
const user = express.Router();
const authController = require("../controller/userController");

user.get("/users",authController.getAllUsers);

module.exports = user