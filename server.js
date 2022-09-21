const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');

db.connect(async function (err) {
    if (err) throw err;
    console.log('Employee Tracker initialized.');
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
    return inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'Please provide the department name you would like to add (limit: 30 characters).',
        }
    ])
    .then(answer=>{
        const sql = `INSERT INTO departments(department_name) VALUES (?)`;
        const params = [answer.departmentName];

        db.query(sql, params, (err,rows) => {
            if (err) {
                console.log(err);
                return;
            };
            console.log(`${answer.departmentName} department has been added.`);
        })
    })
    .then(()=>{
        const sql = `SELECT * FROM departments`

        db.query(sql, (err,rows) => {
            if (err) {
                console.log(err);
                return;
            };
            console.table(rows);
            init();
        })
    })
    

}

function addRole () {
    const sql = `SELECT * FROM departments`;
    console.log('Add Role \nPlease reference the table below for department_id');
   
    db.query(sql, (err,rows) => {
        if (err) {
            console.log(err);
            return;
        };
        console.table(rows);
        rolePrompt();
    });
};

function rolePrompt () {
    
    return inquirer.prompt([
        {
            type: 'input',
            name: 'roleTitle',
            message: 'Please provide the title of the role you would like to add (limit: 30 characters).',
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'Please provide the salary for this role in CAD (e.g. 10000.00).'
        },
        {
            type: 'input',
            name: 'roleDepartment',
            message: 'Please provide the id of the department this role belongs to (reference table above).'
        }
    ])
    .then(answer=>{
        const sql = `INSERT INTO roles(title, salary, department_id) VALUES (?,?,?)`;
        const params = [answer.roleTitle, answer.roleSalary, answer.roleDepartment];

        db.query(sql, params, (err,rows) => {
            if (err) {
                console.log(err);
                return;
            };
            console.log(`${answer.roleTitle} has been added.`);
        })
    })
    .then(()=>{
        const sql = `SELECT * FROM roles`;

        db.query(sql, (err,rows) => {
            if (err) {
                console.log(err);
                return;
            };
            console.table(rows);
            init();
        });
    })
}


function addEmployee () {
    const sql = `SELECT * FROM departments`;

    console.log('Add Employee \nPlease reference the table below for department_id');
    
   
    db.query(sql, (err,rows) => {
        if (err) {
            console.log(err);
            return;
        };
        console.table(rows);
        employeePrompt();
    });
}

function employeePrompt () {
    console.log('sent to employeePrompt()');
    init();
}

function quit () {
    console.log('\nEmployee Tracker closed. Good Bye!\n');
    process.exit();
}
//define functions above; modularize later

function init () {
    console.log('\n -------------------------------------- \n ')
    employee()
        .catch(err=>{
            console.log(err);
        })
}


