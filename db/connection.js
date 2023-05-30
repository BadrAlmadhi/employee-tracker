const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Badr@1995",
    database: "employee_db"
});

db.connect((err)=>{
    if (err) throw err;
    console.log(`Connected to employee_db databases.`);
});

module.exports = db;



