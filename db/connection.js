const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config('../.env');

//connect to database (mysql2)
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'employees_db'
    },
)

module.exports = db;