// pseudocode 
// first step create schema file and seeds (done)
// create connection.js to connect sql to node
// run the query 


const logo = require('asciiart-logo');
const table = require('console.table');
const db = require('./db/connection');
const { default: inquirer } = require('inquirer');

// logo call function 
init();

// create logo
function init() {
    const logoText = logo({ name: "Employee Manager"}).render();
    console.log(logoText);
};


// function selecting all departments table
const viewAllDepartments = () => {
    const sql = "SELECT * FROM department;";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.table(result)
    });
}


// function selecting all role table
const ViewAllRoles = () => {
    const sql = 'SELECT * FROM role;';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.table(result);
    })
};

// Function selecting employee table 
const viewAllEmployee = () => {
    const sql = 'SELECT * FROM employee;';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.table(result);
})
};

// call functions 
viewAllDepartments();
ViewAllRoles();
viewAllEmployee();
