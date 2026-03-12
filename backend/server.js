// ============================================
// server.js - FIXED VERSION
// ============================================

const express = require('express');
const app = express();
const PORT = 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json());


// ============================================
// ROUTES
// ============================================
// ✅ Make sure the path is correct
app.use("/api", require("./routes/loginRoutes"));
app.use("/api", require("./routes/registerRoutes"));

// ============================================
// START SERVER
// ============================================
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});