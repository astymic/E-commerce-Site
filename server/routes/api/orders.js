const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/orderController');
const auth = require('../../middleware/auth');
const { validateOrder } = require('../../validation/orderValidation');


// @route   POST api/orders
// @desc    Create a new order
// @access  Private 
router.post('/', auth, validateOrder, orderController.createOrder);


// @route   GET api/orders/:id
// @desc    Get order details bi ID
// @access  Private 
router.get('/:id', auth, orderController.getOrderById);


module.exports = router;