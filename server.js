const inquirer = require('inquirer');
const db = require('./db/connection');

const employee = (answer) => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Select an option',
            choices:[
                'view all departments',
                'view all roles',
                'view all employees',
                'add a department',
                'add a role',
                'add an employee',
                'quit'
            ]
        }
    ])
}

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
