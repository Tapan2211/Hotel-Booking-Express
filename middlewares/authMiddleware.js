// middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>
    if (!token) {
        return res.status(403).json({ message: 'Access Denied: No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Access Denied: Invalid token' });
        }
        req.user = user; // Attach user info to request object
        next();
    });
};

module.exports = authenticateToken;
