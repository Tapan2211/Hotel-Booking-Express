const { validate } = require('express-validation');

const validationMiddleware = (schema) => {
    return (req, res, next) => {
        const result = validate(schema, {}, { abortEarly: false })(req, res, next);
        if (result instanceof Error) {
            next(result);
        }
    };
};

module.exports = validationMiddleware;