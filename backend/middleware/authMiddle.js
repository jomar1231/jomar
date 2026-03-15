require('dotenv').config();
const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next)=>{
  const authHeader = req.headers["authorization"];
  if(!authHeader) return res.status(401).json({message:"Access denied - No token provided"});

  const tokenParts = authHeader.split(" ");
  if(tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({message:"Invalid token format. Use: Bearer <token>"});
  }
  
  const token = tokenParts[1];
  jwt.verify(token, process.env.JWT_SECRET || "secretkey", (err,decoded)=>{
    if(err) return res.status(403).json({message:"Invalid or expired token"});
    req.user = decoded;
    next();
  });
};


module.exports = verifyToken;
