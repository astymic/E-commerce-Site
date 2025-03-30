const Product = require('../models/Product');
const User = require('../models/User');


const populateCartItems = async (userId) => {
    const user = await User.findById(userId).populate({
        path: 'cart.product',
        select: 'name price images'
    });
    return user ? user.cart : [];
};


// @route   GET api/cart
// @desc    Get cart content for a user
// @access  Private (User must be logged in)
exports.getCart = async (req, res) => {
    try {
        const cartItems = await populateCartItems(req.user.id);
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

        const existingCartItemIndex = cartItems.findIndex(item => item.product.toString() === productId);

        if (existingCartItemIndex > -1) {
            cartItems[existingCartItemIndex].quantity += quantity;
        } else {
            cartItems.push({ product: productId, quantity });
        }

        user.cart = cartItems;  
        await user.save();

        const updatedPopulatedCart = await populateCartItems(req.user.id);
        res.json(updatedPopulatedCart);    
    
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

        const updatedPopulatedCart = await populateCartItems(req.user.id);
        res.json(updatedPopulatedCart);    
        
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

        const updatedPopulatedCart = await populateCartItems(req.user.id);
        res.json(updatedPopulatedCart);    
        
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

        res.json([]);  // Confirmation message

     }  catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
     }
};