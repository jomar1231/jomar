const express = require('express');
const user = express.Router();
const authController = require("../controller/userController");
const addToProduct = require("../models/userModels");

user.get("/:id", (req, res) =>{
    const product= req.params.product;
    addToProduct = (callback) =>{
    db.query("INSERT INTO products (img, name, stars, ratings, price, quantity) VALUES(?,?,?,?,?,?)", callback, [product],  
        (err, result)=>{
            if(err){
                return res.status(500).json({message: "NO PRODUCTS NOT FOUND"});
            }
    }
    );
}
})
user.get("/users",authController.getAllUsers);
module.exports = user