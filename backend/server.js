// ============================================
// server.js - FIXED VERSION
// ============================================
require('dotenv').config();
const PORT = process.env.PORT || 3006;
const express = require('express');
const app = express();
const cors = require("cors");
const path = require('path');
const helmet = require("helmet");
const register = require("./routes/registerRoutes");
const login = require("./routes/loginRoutes");
const user = require("./routes/userRoutes");
app.use(cors());
app.use(express.json());  
app.use(helmet());
// ============================================
// API ROUTES (MUST come before static files)
// ============================================
app.use("/api", register);
app.use("/api", login);
app.use("/api", user);
// ============================================
// HTML PAGE ROUTES
// ============================================
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/coffee-login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/coffee-register.html'));
});

app.get('/dashboard',(req,res) =>{
  res.sendFile(path.join(__dirname,'../frontend/shopmarket.html'));
});

// ============================================
// STATIC FILES
// ============================================
// Serve your entire frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));
// ============================================
// 404 HANDLER (MUST be last)
// ============================================
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ============================================
// START SERVER
// ============================================
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
