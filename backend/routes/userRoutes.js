const express = require('express');
const router = express.Router();
const authController = require("../controller/authController");

router.get("/users",authController.getAllUsers);


module.exports = router