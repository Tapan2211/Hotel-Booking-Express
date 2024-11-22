const validationMiddleware = (schema) => {
    return (req, res, next) => {
        // Handle multipart/form-data parsing for specific fields
        const data = {
            ...req.body,
            ...(req.files ? { images: req.files.map((file) => file.filename) } : {}),
        };

        // Parse JSON strings into arrays for specific fields
        if (data.facilities && typeof data.facilities === 'string') {
            try {
                data.facilities = JSON.parse(data.facilities);
            } catch (error) {
                return res.status(400).json({ message: 'Invalid facilities format. Must be a valid JSON array.' });
            }
        }

        if (data.roomTypes && typeof data.roomTypes === 'string') {
            try {
                data.roomTypes = JSON.parse(data.roomTypes);
            } catch (error) {
                return res.status(400).json({ message: 'Invalid roomTypes format. Must be a valid JSON array.' });
            }
        }

        // Validate the data
        const { error } = schema.validate(data, { abortEarly: false });

        if (error) {
            // Return validation errors
            return res.status(400).json({
                message: 'Validation failed',
                errors: error.details.map((err) => err.message),
            });
        }

        // Attach validated data to the request for the controller
        req.validatedData = data;

        // Proceed to the next middleware
        next();
    };
};

module.exports = validationMiddleware;



// // middlewares/validationMiddleware.js
// const { validate } = require('express-validation');

// const validationMiddleware = (schema) => {
//     return (req, res, next) => {
//         // `validate` returns a function that you should use as middleware
//         const result = validate(schema, {}, { abortEarly: false })(req, res, next);
//         if (result instanceof Error) {
//             next(result);
//         }
//     };
// };

// module.exports = validationMiddleware;
