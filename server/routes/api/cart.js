const express = require('express');
const router = express.Router();
const cartController = require('../../controllers/cartController');
const auth = require('../../middleware/auth');


// @route   GET api/cart
// @desc    Get cart content for a user
// @access  Private 
router.get('/', auth, cartController.getCart);


// @route   POST api/cart
// @desc    Add item to cart
// @access  Private 
router.post('/', auth, cartController.addItemToCart);


// @route   PUT api/cart/:productId
// @desc    Update quantity of item in cart
// @access  Private (User must be logged in)
router.put('/:productId', auth, cartController.updateCartItemQuantity)


// @route   DELETE api/cart/:product
// @desc    Remove item from cart
// @access  Private 
router.delete('/:productId', auth, cartController.removeItemFromCart);


// @route   DELETE api/cart
// @desc    Clear the entire cart
// @access  Private 
router.delete('/', auth, cartController.clearCart);


module.exports = router;