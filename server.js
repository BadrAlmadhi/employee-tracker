const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json);

// connecting SQL to Node.js
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Badr@1995',
        database:  'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

db.query('SELECT * FROM department', (err, results)=>{
console.log(results);
});

db.query('SELECT * FROM role', (err, results)=>{
    console.log(results);
    });


    
app.listen(PORT, ()=>{
console.log(`Server running on port ${PORT}`);
});
