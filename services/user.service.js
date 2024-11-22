const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/users.model');

const createUser = async (userData) => {
    const { username, email, mobile_number, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.createuser({
        username,
        email,
        mobile_number,
        password: hashedPassword,
    });

    return user;
}

const loginUser = async ({ username, password }) => {
    const user = await userModel.getUserByUsername(username);
    if (!user) {
        throw new Error('Invalid username or password');
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid username or password');
    }
    const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET, // Replace with your secret
        { expiresIn: '1h' }
    );

    return { token, user };
}

const getAllUsers = async () => {
    const users = await userModel.getAllUsers();
    return users;
};
module.exports = {
    createUser,
    loginUser,
    getAllUsers,
}