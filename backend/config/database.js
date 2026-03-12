const mysql = require('mysql');

// ============================================
// DATABASE CONNECTION (Export first!)
// ============================================

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "jomar"
});


db.connect((err)=>{
    if(err){
        console.error("Database is not connected ",err);
        return;
    }
    console.log('Database is Connected Successfully');
});

module.exports = db;




