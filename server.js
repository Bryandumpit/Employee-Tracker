const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');

db.connect( function (err) {
    if (err) throw err;
    console.log('Employee Tracker initialized.');
    init();
});

//prompt and input handling
function employeeTracker () {
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
                'Update an Employee Role',
                'Quit'
            ]
        }
    ])
    .then((answer)=>{
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
            case 'Update an Employee Role':
                updateEmployeeRole();
                break;
            case 'Quit':
                quit();
        };  
    })
}
    
    

//query functions
//View queries:

function viewDepartments () { 
    const sql = `SELECT * FROM departments`;

    db.query(sql, (err,rows) => {
        if (err) {
            console.log(err);
            return;
        };
        console.log('View Departments');
        console.table(rows);
        console.log('\n-------------------------\nWhat would you like to do next?')
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
        console.log('\n-------------------------\nWhat would you like to do next?')
        init();
    })
}

function viewEmployees () {
    const sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title AS title, roles.salary AS salary, departments.department_name, employees.manager_id AS manager
                FROM (employees JOIN roles ON employees.role_id = roles.id)
                JOIN departments ON roles.department_id = departments.id`;

    db.query(sql, (err,rows) => {
        if (err) {
            console.log(err);
            return;
        };
        console.log('View Employees');
        console.table(rows);
        console.log('\n-------------------------\nWhat would you like to do next?')
        init();
    })
}

//Add to queries:
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
            console.log('\n-------------------------\nWhat would you like to do next?');
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
            console.log('\n-------------------------\nWhat would you like to do next?');
            init();
        });
    })
}


function addEmployee () {
    const sql = `SELECT * FROM employees LEFT JOIN roles ON employees.role_id = roles.id`;

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

    return inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Please provide the first name of the employee (limit: 30 characters).',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Please provide the last name of the employee (limit: 30 characters).'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Please provide the id of the role of the employee(reference table above).'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Please provide the id of the manager of the employee(reference table above).'
        }
    ])
    .then(answer=>{
        const sql = `INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
        const params = [answer.first_name, answer.last_name, answer.role_id, answer.manager_id];

        db.query(sql, params, (err,rows) => {
            if (err) {
                console.log(err);
                return;
            };
            console.log(`Employee ${answer.last_name, answer.first_name} has been added.`)
        })
    })
    .then(()=>{
        const sql = `SELECT * FROM employees`;

        db.query(sql, (err,rows) => {
            if (err) {
                console.log(err);
                return;
            };
            console.table(rows);
            console.log('\n-------------------------\nWhat would you like to do next?');
            init();
        })
    })   
}

//update function
function updateEmployeeRole () {
    const sql = `SELECT roles.id AS role_id, roles.title AS title, employees.id AS employee_id, employees.first_name, employees.last_name 
                FROM employees 
                LEFT JOIN roles ON employees.role_id = roles.id`;

    console.log('Update employee role \nPlease reference the tables below.');

    db.query(sql, (err,rows) => {
        if (err) {
            console.log(err);
            return;
        };
        console.table(rows);
    });

    const sql2 = `SELECT * FROM roles`;
    db.query(sql2, (err,rows) => {
        if (err) {
            console.log(err);
            return;
        };
        console.table(rows);
        updateEmployeePrompt();
    });

}
function updateEmployeePrompt(){
    return inquirer.prompt([
        {
            type:'choice',
            name: 'employeeId',
            message: 'Please enter the id of the employee (refer to tables above).'
        },
        {
            type:'choice',
            name: 'newRoleId',
            message: 'Please enter the id of the new role for the employee (refer to tables above).'
        }
    ])
    .then((answer)=>{
        const sql = `UPDATE employees SET role_id=? WHERE id =?`;
        const params = [answer.newRoleId, answer.employeeId];

        db.query(sql, params, (err,rows) => {
            if (err) {
                console.log(err);
                return;
            } else if (!rows.affectedRows) {
                console.log('Employee not found')
            } else {
                console.table(`Employee ID no. ${answer.employeeId} role has been updated to Role ID no. ${answer.newRoleId}.`);
            } 
        })
    })
    .then(()=>{
        const sql = `SELECT * FROM employees`;

        db.query(sql, (err,rows)=>{
            if (err) {
                console.log(err);
                return;
            }
            console.table(rows);
            console.log('\n-------------------------\nWhat would you like to do next?');
            init();
        })
    })
}

//initialize and quit functions
function init () {
    console.log('\n -------------------------------------- \n')
    
    employeeTracker()
        .catch(err=>{
            console.log(err);
        })
}

function quit () {
    console.log('\nEmployee Tracker closed. Good Bye!\n');
    process.exit();
}