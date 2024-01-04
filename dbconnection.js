const { createPool } = require('mysql');
const pool = createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "drugdispensing",
    connectionLimit: 10
});

module.exports = pool;