const { validate } = require('express-validation');

const validationMiddleware = (schema) => {
    return (req, res, next) => {
        // `validate` returns a function that you should use as middleware
        const result = validate(schema, {}, { abortEarly: false })(req, res, next);
        if (result instanceof Error) {
            next(result);
        }
    };
};

module.exports = validationMiddleware;