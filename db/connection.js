const mysql = require('mysql2');

//connect to database (mysql2)
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'employees_db'
    },
    console.log('Connected to the employees database')
)

module.exports = db;