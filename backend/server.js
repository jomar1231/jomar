import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = process.env.PORT || 3006;
import express from 'express';
import cookieParser from 'cookie-parser';
const app = express();
import cors from "cors";
import path from 'path';
import helmet from "helmet";
import register from "./routes/registerRoutes.js";
import login from "./routes/loginRoutes.js";
import user from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());  
app.use(cookieParser());
app.use(helmet());
// ============================================
// API ROUTES (MUST come before static files)
// ============================================
app.use("/api", register);
app.use("/api", login);
app.use("/api", user);
app.use("/api", productRoutes);
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
