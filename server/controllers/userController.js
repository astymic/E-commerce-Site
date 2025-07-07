const User = require('../models/User');
const Order = require('../models/Order');
const bcrypt = require('bcrypt');   // For password hashing
const jwt = require('jsonwebtoken'); // For JWT generation
const config = require('config');   // To get JWT secret from config
const mongoose = require('mongoose');


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


// @route   GET api/user/orders
// @desc    Get orders for current user
// @access  Private 
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
                                    .sort({ createdAt: -1 });
        res.json(orders)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};



// @route   GET api/user/addresses
// @desc    Get user's saved addresses
// @access  Private 
exports.getAddresses = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('savedAddresses');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user.savedAddresses || []);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// @route   POST api/user/addresses
// @desc    Add a new address 
// @access  Private 
exports.addAddress = async (req, res) => {
    const { type, city, location } = req.body;
    if (!type || !city || !location) {
        return res.status(400).json({ msg: 'Address type, city, and location are required' });
    }
    if (!['store', 'post', 'address'].includes(type)) {
        return res.status(400).json({ msg: 'Invalid address type' });
    }

    const newAddress = {
        type,
        city,
        location,
        isDefault: false
    };

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.savedAddresses.push(newAddress);
        await user.save();
        res.json(user.savedAddresses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// @route   PUT api/user/addresses/:addressId
// @desc    Update an address
// @access  Private 
exports.updateAddress = async (req, res) => {
    const { addressId } = req.params;
    const { isDefault } = req.body;

    if (!mongoose.Types.ObjectId.isValid(addressId)) {
        return res.status(400).json({ msg: 'User not found' });
    }

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        let addressFound = false;
        user.savedAddresses.forEach(address => {
            if (address._id.toString() === addressId) {
                if (isDefault === true) {
                    user.savedAddresses.forEach(otherAddr => {
                        if (otherAddr._id.toString() !== addressId) {
                            otherAddr.isDefault = false;
                        }
                    });
                }
                address.isDefault = isDefault !== undefined ? isDefault : address.isDefault;
                addressFound = true;
            } else if (isDefault === true) {
                address.isDefault = false;
            }
        });

        if (!addressFound) {
            return res.status(404).json({ msg: 'Address not found' });
        }

        await user.save();
        res.json(user.savedAddresses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// @route   DELETE api/user/addresses/:addressId
// @desc    Update an address
// @access  Private 
exports.deleteAddress = async (req, res) => {
    const { addressId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(addressId)) {
        return res.status(400).json({ msg: 'Invalid Address ID format' });
    }

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const removeIndex = user.savedAddresses.findIndex(addr => addr._id.toString() === addressId);

        if (removeIndex === -1) {
            return res.status(404).json({ msg: 'Address not found' });
        }

        user.savedAddresses.splice(removeIndex, 1);
        await user.save();
        res.json(user.savedAddresses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};