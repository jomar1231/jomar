import 'dotenv/config';
import mysql from 'mysql2';



// ============================================
// DATABASE CONNECTION (Export first!)
// ============================================
const db = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});


db.connect((err)=>{
    if(err){
        console.error("Database is not connected ",err);
        return;
    }
    console.log('Database is Connected Successfully');
});

export default db;

