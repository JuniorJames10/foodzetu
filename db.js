const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'res_ms',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the database connection and export the pool
pool.getConnection()
    .then(connection => {
        console.log('Database connection pool created successfully.');
        connection.release();
    })
    .catch(err => {
        console.error('FATAL ERROR: Could not create database connection pool.', err);
        process.exit(1); // Exit if cannot connect to the DB
    });

module.exports = pool;
