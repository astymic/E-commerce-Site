const Product = require('../models/Product');
const User = require('../models/User');


// @route   GET api/cart
// @desc    Get cart content for a user
// @access  Private (User must be logged in)
exports.getCart = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('wishlist'); // Populate wishlist if needed
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // For simplicity, we'll store cart items directly in user document
        // In real project, need have 'Cart' collection
        const cartItems = user.cart || [];

        res.json(cartItems);
    
    }   catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// @route   POST api/cart
// @desc    Add item to cart
// @access  Private (User must be logged in)
exports.addItemToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || quantity <= 0) {
            return res.status(400).json({ msg: 'Product ID and quantity are required' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        let cartItems = user.cart || [];

        // Check if item already in cart
        const existingCartItemIndex = cartItems.findIndex(item => item.product.toString() === productId);

        if (existingCartItemIndex > -1) {
            // Item exist, update quantity
            cartItems[existingCartItemIndex].quantity += quantity;
        } else {
            // item doesn't exist, add new item
            cartItems.push({ product: productId, quantity });
        }

        user.cart = cartItems;  // Update cart in user document
        await user.save();

        res.json(cartItems);    // Return updated cart
    
    }   catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};


// @route   PUT api/cart/:productId
// @desc    Update quantity of item in cart
// @access  Private (User must be logged in)
exports.updateCartItemQuantity = async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;

        if (quantity <= 0) {
            return res.status(400).json({ msg: 'Quantity must be greater than zero' });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        let cartItems = user.cart || [];
        const cartItemindex = cartItems.findIndex(item => item.product.toString() === productId);
        
        if (cartItemindex === -1) {
            return res.status(404).json({ msg: 'Item not found in cart' });
        }

        cartItems[cartItemindex].quantity = quantity;
        user.cart = cartItems;
        await user.save();

        res.json(cartItems); // Return updated cart
    
    }   catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};


// @route   DELETE api/cart/:product
// @desc    Remove item from cart
// @access  Private (User must be logged in)
exports.removeItemFromCart = async (req, res) => {
    try {
        const { productId } = req.params;

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        let cartItems = user.cart || [];
        const updateCartItems = cartItems.filter(item => item.product.toString() !== productId); // Filter out the item to remove

        if (cartItems.length === updateCartItems.length) { // Check if item was actually removed
            return res.status(404).json({ msg: 'Item not found in cart' });
        }

        user.cart = updateCartItems;
        await user.save();

        res.json(updateCartItems); // Return updated cart

    }   catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};


// @route   DELETE api/cart
// @desc    Clear the entire cart
// @access  Private (User must be logged in)
exports.clearCart = async (req, res) => {
     try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.cart = []; // Clear the cart
        await user.save();

        res.json({ msg: 'Cart cleared' });  // Confirmation message

     }  catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
     }
};