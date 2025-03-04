const User = require('../models/User');
const bcrypt = require('bcrypt');   // For password hashing
const jwt = require('jsonwebtoken'); // For JWT generation
const config = require('config');   // To get JWT secret from config


// @route   POST api/users/register
// @desc    Register a new user
// @access  Public
exports.registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Validation
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }

        // Check if user already exists by email
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        
        const newUser = new User({
            firstName,
            lastName,
            email,
            password,   // Plain password - will be hashed
        });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        await newUser.save();

        // Create and return JWT
        const payload = {
            user: {
                id: newUser.id,
            },
        };

        jwt.sign(
            payload,
            config.get('jwtSecret'), // Get JWT secret from config
            { expiresIn: '1h' },    // Token expiration time (adjust as needed)
            (err, token) => {
                if (err) throw err;
                res.json({ token }); // Send token back to client
            }
        );

    }   catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// @route   POST api/users/login
// @desc    Login user / Authenticate user get JWT
// @access  Public
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ msg: 'Plaese enter email and password' });
        }

        // Check if user exists by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' }); // Don't specify email/password for security
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }


        // Create and return JWT
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            config.get('jwtSecret'), // Get JWT secter from config
            { expiresIn: '1h' }, // Token expiration time (adjust as needed)
            (err, token) => {
                if (err) throw err;
                res.json({ token }); // Send token back to client
            }
        );

    }   catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// @route   GET api/users/me
// @desc    Get current user data (protected route - requires JWT)
// @access  Public
exports.getCurrentUser = async (req, res) => {
    try {
        // User is a;ready authenticated by auth middleware (will be created in next steps)
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }   catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
