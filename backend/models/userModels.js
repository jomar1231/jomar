import db from '../config/database.js';


export const createUser = (user,callback) =>{
    const {firstname,lastname,email,password} = user;
    db.query("INSERT INTO register (First_Name, Last_Name, Email, Password) VALUES (?,?,?,?)",
        [firstname,lastname,email,password],callback
    );
};

export const findUserByEmail = (email,callback)=>{
    db.query("SELECT id, First_Name as firstname, Last_Name as lastname, Email as email, Password as password FROM register WHERE Email = ?",
        [email],callback
    );
};

export const getAllUsers = (callback)=>{
    db.query("SELECT id, First_Name as firstname, Last_Name as lastname, Email as email, Password as password FROM register",
        callback
    );
};

export const products = (callback) =>{
    db.query("SELECT * FROM products", callback);
}


export const addToProduct = ({img, name, stars, ratings, price, quantity}, callback) =>{
    db.query("INSERT INTO products (img, name, stars, ratings, price, quantity) VALUES(?,?,?,?,?,?)",
        [img, name, stars, ratings, price, quantity], callback
    );
};




