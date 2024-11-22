const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const validationMiddleware = require('../middlewares/registrationMiddleware');
const userValidation = require('../validations/user.validation');
const loginValidation = require('../validations/login.validation');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/register', validationMiddleware(userValidation), userController.createUser);
router.post('/login', validationMiddleware(loginValidation), userController.loginUser);
router.get('/', authenticateToken, userController.getAllUsers);

module.exports = router