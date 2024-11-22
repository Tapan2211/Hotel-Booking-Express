const userService = require('../services/user.service');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        console.log("data", user);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const { token, user } = await userService.loginUser({ username, password });
        res.status(200).json({ message: 'Login successful', token, user });
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({ message: 'Users fetched successfully', users });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createUser,
    loginUser,
    getAllUsers
}