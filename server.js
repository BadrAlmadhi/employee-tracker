// pseudocode 
// first step create schema file and seeds (done)
// create connection.js to connect sql to node
// run the query 


const logo = require('asciiart-logo');
const table = require('console.table');
const db = require('./db/connection');
const inquirer = require('inquirer');

// logo call function 
init();

// create logo
function init() {
    const logoText = logo({ name: "Employee Manager"}).render();
    console.log(logoText);
};

const questions = () => {
    inquirer.prompt([{
        type: 'list', 
        name: 'prompt',
        message: 'What would you like to do?',
        choices: ['View All Employee', 'Add Employee', 'Update Employee Role', 'View All Roles', 
        'Add Role', 'View All Departments', 'Add Department']
    }]).then((answers) => {
        if (answers.prompt === 'View All Employee') {
          
            viewAllEmployee();  
        } else if (answers.prompt === 'View All Roles') {
            ViewAllRoles();
        } else if (answers.prompt === 'View All Departments'){
            viewAllDepartments();
        } else if (answers.prompt === 'Add Employee') {

        }

    });
}

// function selecting all departments table
const viewAllDepartments = () => {
    const sql = "SELECT * FROM department;";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.table(result)
        questions();
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

// Add employee
const addDepartment = () => {
    const sql = 'INSERT INTO department (name) VALUES (?)', [answers.department], (err, result) => {
        
    }
}


questions();
