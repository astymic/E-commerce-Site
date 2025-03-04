const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token'); // Typically tokens are sent in 'x-auth-token' header

    // Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denided' }); // 401 Unauthorized
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret')); // Verify token using secret
        req.user = decoded.user; // If valid, set user in request object
        next(); // Call next middleware
    }   catch (err) {
        res.status(401).json({ msg: 'Token is not valid' }); // Token invalid - 401 Unathorized
    }
};