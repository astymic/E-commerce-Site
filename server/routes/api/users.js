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


// @route   GET api/user/orders
// @desc    Get orders for current user
// @access  Private 
router.get('/orders', auth, userController.getUserOrders);



// @route   GET api/user/addresses
// @desc    Get user's saved addresses
// @access  Private 
router.get('/addresses', auth, userController.getUserAddresses);


// @route   POST api/user/addresses
// @desc    Add a new address 
// @access  Private 
router.post('/addresses', auth, userController.addUserAddress);


// @route   PUT api/user/addresses/:addressId
// @desc    Update an address
// @access  Private 
router.put('/addresses:/addressId', auth, userController.updateUserAddress);


// @route   DELETE api/user/addresses/:addressId
// @desc    Update an address
// @access  Private 
router.delete('/addresses:/addressId', auth, userController.deleteUserAddress);



module.exports = router;