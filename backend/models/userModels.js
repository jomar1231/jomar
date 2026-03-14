const db = require('../config/database');


exports.createUser = (user,callback) =>{
    const {firstname,lastname,email,password} = user;
    db.query("INSERT INTO register (First_Name,Last_Name, Email, Password) VALUES (?,?,?,?)",
        [firstname,lastname,email,Password],callback
    );
};

exports.findUserByEmail = (email,callback)=>{
    db.query("SELECT * FROM register WHERE Email = ?",
        [email],callback
    );
};



