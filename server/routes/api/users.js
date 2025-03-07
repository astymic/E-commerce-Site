const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const auth = require('../../middleware/auth');
const { validateRegistration, validateLogin } = require('../../validation/userValidation');


// @route   POST api/user/register
// @desc    Register user
// @access  Public
router.post('/register', validateRegistration, userController.registerUser);

// @route   POST api/user/login
// @desc    Authenticate user and get token (Login)
// @access  Public
router.post('/login', validateLogin, userController.loginUser);


// @route   GET api/user/me
// @desc    Get current user data
// @access  Private (needs authentication)
router.get('/me', auth, userController.getCurrentUser); // Use 'auth' middleware to protect this route


module.exports = router;