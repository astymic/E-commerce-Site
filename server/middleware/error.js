const fs = require('fs');
const path = require('path');

function errorHandler(err, req, res, next) {
    const errorLog = `
[${new Date().toISOString()}] ERROR:
Message: ${err.message || 'No message'}
Stack: ${err.stack || 'No stack'}
Error Object: ${JSON.stringify(err, null, 2)}
-----------------------------------------------
`;
    fs.appendFileSync(path.join(__dirname, '../server_crash.log'), errorLog);

    console.error('ERROR HANDLER CALLED:', err)

    // Check if it's a Joi validation error
    if (err.error && err.error.isJoi) {
        return res.status(400).json({ msg: err.error.details[0].message });
    }
    // ... rest of the file ...

    // Handle Mongoose validation errors (e.g., required fields, unique constraints)
    if (err.name === 'ValidationError') {
        const errors = {};
        for (let field in err.errors) {
            errors[field] = err.errors[field].message;
        }
        return res.status(400).json({ errors: errors }); // Return Mongoose validation errors with 400 status
    }

    // Handle Mongoose CastError (e.g.. invailid ObjectId)
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(400).json({ msg: 'Invalid ID format' });
    }

    // Handle JWT authentication errors (if throw explicily)
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        return res.status(400).json({ msg: 'Authentication failed: ' + err.message }); // JWT related errors
    }

    // Default server error response for all other unhandled errors
    res.status(500).json({ msg: 'Server error', error: process.env.NODE_ENV === 'development' ? err.message : {} }); // Send error details in development only
}

module.exports = errorHandler;