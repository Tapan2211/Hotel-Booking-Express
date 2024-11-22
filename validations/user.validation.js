const Joi = require('joi');

const userValidation = {
    body: Joi.object({
        username: Joi.string().min(2).max(20).required(),
        email: Joi.string().email().required(),
        mobile_number: Joi.string().pattern(/^[0-9]{10}$/).required(),
        password: Joi.string().min(3).required(),
    }),
};

module.exports = userValidation;
