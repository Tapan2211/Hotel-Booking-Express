// validations/city.validation.js
const Joi = require('joi');

const cityValidation = {
    body: Joi.object({
        city: Joi.string().required().messages({
            'any.required': 'City name is required',
            'string.empty': 'City name cannot be empty',
        }),
    }),
};

module.exports = cityValidation;
