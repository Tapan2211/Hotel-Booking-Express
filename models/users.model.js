const db = require('../config/db');

const createuser = async (data) => {
    const { username, email, mobile_number, password } = data;

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        throw new Error('Email already in use');
    }

    const query = `
        INSERT INTO users (username, email, mobile_number, password, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, NOW(), NOW())
    `;
    const [results] = await db.execute(query, [username, email, mobile_number, password]);

    if (results.affectedRows === 0) {
        throw new Error('User creation failed');
    }

    return {
        id: results.insertId,
        username,
        email,
        mobile_number,
    };
};

const getUserByEmail = async (email) => {
    const query = `SELECT * FROM users WHERE email = ?`;
    const [results] = await db.execute(query, [email]);
    return results.length ? results[0] : null;
};

const getUserByUsername = async (username) => {
    const query = `SELECT * FROM users WHERE username = ?`;
    const [results] = await db.execute(query, [username]);
    return results.length ? results[0] : null;

}

const getAllUsers = async () => {
    const query = `SELECT id, username, email, mobile_number FROM users`;
    const [results] = await db.execute(query);
    return results;
};

module.exports = {
    createuser,
    getUserByEmail,
    getUserByUsername,
    getAllUsers,
};
