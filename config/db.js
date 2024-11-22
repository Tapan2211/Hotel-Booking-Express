const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

(async () => {
    try {
        await db.getConnection(); // Test the connection
        console.log('Connected to MySQL Database!');
    } catch (err) {
        console.error('Error connecting to database:', err);
    }
})();

module.exports = db;


// const mysql = require('mysql2');
// const dotenv = require('dotenv');
// dotenv.config();

// const db = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

// db.getConnection((err) => {
//     if (err) {
//         console.log('Error conntecting to database:', err);
//         return;
//     }
//     console.log('Connected to MySQL Database!');
// });

// module.exports = db;