import 'dotenv/config';
import jwt from "jsonwebtoken";

const verifyToken = (req,res,next)=>{
  let token = null;

  // Prefer Authorization header, fallback to cookie
  if (req.headers.authorization) {
    const authHeader = req.headers.authorization;
    const tokenParts = authHeader.split(" ");
    if (tokenParts.length === 2 && tokenParts[0] === "Bearer") {
      token = tokenParts[1];
    } else {
      return res.status(401).json({message:"Invalid token format. Use: Bearer <token>"});
    }
  } else if (req.cookies && req.cookies.authToken) {
    token = req.cookies.authToken;
  }
  if (!token) {
    return res.status(401).json({message:"Access denied - No token provided"});
  }
  jwt.verify(token, process.env.JWT_SECRET || "secretkey", (err,decoded)=>{
    if(err) return res.status(403).json({message:"Invalid or expired token"});
    req.user = decoded;
    next();
  });
};

export default verifyToken;
