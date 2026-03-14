const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next)=>{
  const authHeader = req.headers["authorization"];
  if(!authHeader) return res.status(401).json({message:"Access denied"});

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET || "secretkey", (err,decoded)=>{
    if(err) return res.status(403).json({message:"Invalid token"});
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
