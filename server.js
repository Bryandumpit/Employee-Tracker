const inquirer = require('inquirer');
const db = require('./db/connection');

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
    console.log('View Deparments');
}

function viewRoles () {
    console.log('View Roles');
}

function viewEmployees () {
    console.log('View Employees');
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
//define functions above; modularize later

function init () {
    employee()
        .then((answer)=>{
            console.log(answer)
        })
        .catch(err=>{
            console.log(err);
        })
}

init();
