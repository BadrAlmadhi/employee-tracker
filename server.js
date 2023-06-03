// pseudocode 
// first step create schema file and seeds (done)
// create connection.js to connect sql to node
// run the query 


const logo = require('asciiart-logo');
const table = require('console.table');
const db = require('./db/connection');
const inquirer = require('inquirer');


// order of exsecustion 
db.connect(() => questions());

// multi asecrenece


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
        choices: [
            "View all departments", // Done
            "View all roles", // Done
            "View all employees", // Done
            "Add a department", // Done
            "Add a role", // Done
            "Add an employee", // working in it
            "Update an employee role",
            "Update an employee's manager",
            "View employees by manager",
            "View employees by department",
            "Remove a department",
            "Remove a role",
            "Remove an employee",
            "Exit"
        ]
    }]).then((answers) => {
        if (answers.prompt === 'View all employees') {
            viewAllEmployee();  
        } else if (answers.prompt === 'View all roles') {
            ViewAllRoles();
        } else if (answers.prompt === 'View all departments'){
            viewAllDepartments();
        } else if (answers.prompt === 'Add a department') {
            inquirer.prompt([{
                type: 'input',
                name: 'department',
                message: 'What is the name of the department?',
                validate: departmentInput => {
                    if (departmentInput) {
                        return true;
                    } else {
                        consols.log('Please Add a department name')
                        return false;
                    }
                }
            }]).then((dep) => {
                addDepartment(dep);
            })
        } else if (answers.prompt === 'Add a role') {
            db.query('SELECT * FROM department', (err, result) => {
                // map in the array of objects, to create a new array of objects. 
                const departmentChoices = result.map(({id, department_name})=>({
                    name: department_name,
                    value: id
                }));
                inquirer.prompt([{
                    type: 'input',
                    name: 'title',
                    message: 'What is the name of the role?',
                    validate: roleInput => {
                        if (roleInput) {
                            return true;
                        } else {
                            console.log('Please add a role name');
                            return false;
                        }
                    }
                },
                {
                    type: 'list',
                    name: 'department',
                    message: 'What is the department name of the role?',
                    choices: departmentChoices
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the salary of the role?',
                    validate: roleInput => {
                        if (roleInput) {
                            return true;
                        } else {
                            console.log('Please add a role name');
                            return false;
                        }
                    }
                }]).then((rol) => {
                    console.log(rol)
                    addRole(rol);
                })
            })
            
        } else if (answers.prompt === 'Add an employee'){
            db.query(`SELECT * FROM department`, (err, result => {
                const departmentChoices = result.map(({id, department_name})=>({
                    name: department_name,
                    value: id
                }));
                inquirer.prompt([{
                    type: 'input',
                    name: 'first_name',
                    message: 'What is the employee first name?',
                    validate: employeeFirstName => {
                        if (employeeFirstName) {
                            return true
                        } else {
                            console.log("Please inter employee's first name");
                            return false;
                        }
                    }

                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'What is the employee last name?',
                    validate: employeeLastName => {
                        if (employeeLastName) {
                            return true;
                        } else {
                            console.log("Please enter employee's last name");
                            return false;
                        }
                    }
                },
                {
                    type: 'list',
                    name: 'department',
                    message: 'What is the employee role?',
                    

                }
            ])
            }))
        }
// add the role is the same 
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
        questions();
    })
};

// Function selecting employee table 
const viewAllEmployee = () => {
    const sql = 'SELECT * FROM employee;';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.table(result);
        questions();
})
};

// Add department
const addDepartment = (dep) => {
    const sql = `INSERT INTO department (department_name) VALUES (?);`;
    db.query(sql, [dep.department], (err, result) => {
        if (err) throw err;
        viewAllDepartments();
    });
}

// add role 
const addRole = (rol) => {
    // parseInt turn string into a number
    const params = [rol.title, rol.department, parseInt(rol.salary)];
    const sql = `INSERT INTO role (role_title, department_id, role_salary) VALUES (?, ?, ?);`;
    db.query(sql, params, (err, result) => {
        if (err) throw err;
        ViewAllRoles();
    });
}

// // add employee
const addEmployee = (emp) => {
  const params = [emp.first_name, emp.last_name, parseInt(emp.role_id), parseInt(emp.manager_id)];
  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`;
  db.query(sql, params, (err, result) => {
    if (err) throw err;
    console.table(result);
    questions();
  });;
}

// review Acencrence 
// update SQL statement set 