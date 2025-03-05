const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');


module.exports = async function (req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if bo token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denided' }); // 401 Unauthorized
    }

    // Verify token
    try {
        const decode = jwt.verify(token, config.get('jwtSecret'));
        const user = await User.findById(decode.user.id); // Fetch user from DB to get role

        if (!user) {
            return res.status(401).json({ msg: 'User not found' }); // User from token not found in DB (unlikely, but good to check)
        }

        // Check if user has admin role
        if (user.role !== 'admin') {
            return res.status(403).json({ msg: 'Admin access required' });
        }

        req.user = decode.user; // Set user in request object (still useful, though we checked role from DB)
        next(); // Call next middleware - user is authorized as admin

    }   catch (err) {
        res.status(401).json({ msg: 'Token is not valid' }); // Token invalid - 401 unauthozied
    }
};