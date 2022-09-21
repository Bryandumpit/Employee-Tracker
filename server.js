const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');

db.connect(err=> {
    if (err) throw err;
    console.log ('Connected to employees_db database.');
    init();
}

);

const employee = (answer) => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Select an option',
            choices:[
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Quit'
            ]
        }
    ])
    //switch statement based on user choice
    .then(
        answer => {
            switch(answer.choice){
                case 'View All Departments':
                    viewDepartments();
                    break;
                case 'View All Roles':
                    viewRoles();
                    break;
                case 'View All Employees':
                    viewEmployees();
                    break;
                case 'Add a Department':
                    addDepartment();
                    break;
                case 'Add a Role':
                    addRole();
                    break;
                case 'Add an Employee':
                    addEmployee();
                    break;
                case 'Quit':
                    quit();
            }
        }
    )
}


//define functions below; modularize later
function viewDepartments () { 
    const sql = `SELECT * FROM departments`;

    db.query(sql, (err,rows) => {
        if (err) {
            console.log(err);
            return;
        };
        console.log('View Departments');
        console.table(rows);
        init();
    })
}

function viewRoles () {
    const sql = `SELECT * FROM roles`;

    db.query(sql, (err,rows) => {
        if (err) {
            console.log(err);
            return;
        };
        console.log('View Roles');
        console.table(rows);
        init();
    })
}

function viewEmployees () {
    const sql = `SELECT * FROM employees`;

    db.query(sql, (err,rows) => {
        if (err) {
            console.log(err);
            return;
        };
        console.log('View Employees');
        console.table(rows);
        init();
    })
}

function addDepartment () {
    console.log('Add Department');
}

function addRole () {
    console.log('Add Role');
}

function addEmployee () {
    console.log('Add Employee');
}

function quit () {
    console.log('Quit');
    process.exit();
}
//define functions above; modularize later

function init () {
    employee()
        .catch(err=>{
            console.log(err);
        })
}


