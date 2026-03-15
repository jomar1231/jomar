const db = require('../config/database');


exports.createUser = (user,callback) =>{
    const {firstname,lastname,email,password} = user;
    db.query("INSERT INTO register (First_Name,Last_Name, Email, Password) VALUES (?,?,?,?)",
        [firstname,lastname,email,password],callback
    );
};

exports.findUserByEmail = (email,callback)=>{
    db.query("SELECT id, First_Name as firstname, Last_Name as lastname, Email as email, Password as password FROM register WHERE Email = ?",
        [email],callback
    );
};

exports.getAllUsers = (callback)=>{
    db.query("SELECT id, First_Name as firstname, Last_Name as lastname, Email as email, Password as password FROM register",
        callback
    );
};



