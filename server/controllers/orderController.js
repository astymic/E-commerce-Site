const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');


// @route   POST api/orders
// @desc    Create a new order
// @access  Private (User must be logged in)
exports.createOrder = async (req, res) => {
    try {
        const { shippingDetails, paymentMethod, doNotCall, deliveryToAnotherPerson, recipientFirstName, recipientLastName, notes } = req.body;

        // Validation - basic shipping details and payment method required
        if (!shippingDetails || !paymentMethod) {
            return res.status(400).json({ msg: 'Shipping details and payment method are required' });
        }
        if (!shippingDetails.firstName || !shippingDetails.lastName || !shippingDetails.phone || !shippingDetails.type || !shippingDetails.city) {
            return res.status(400).json({ msg: 'Shipping datails incomplete' });
        }
        if (!['cash_on_delivery', 'prepaid', 'installment'].includes(paymentMethod)) {
            return res.status(400).json({ msg: 'Invailid payment method' });
        }

        const user = await User.findById(req.user.id).populate('cart.product'); // Populate cart products
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        
        if (!user.cart || user.cart.length === 0) {
            return res.status(400).json({ msg: 'Cart is empty' });
        }


        let orderItems = [];
        let totalAmount = 0;

        for (let cartItem of user.cart) {
            const product = cartItem.product;
            if (!product) { // Should not happen if cart population is correct, but check anyway
                return res.status(400).json({ msg: 'Product in cart not found' });
            }
            if (product.stock < cartItem.quantity) {
                return res.status(400).json({ msg: `Product "${product.name}" is out of stock for the requested quantity` });
            }

            orderItems.push({
                product: product._id,
                quantity: cartItem.quantity,
                priceAtPurchase: product.price // Record price at purchase time
            });
            totalAmount += product.price * cartItem.quantity;

            // Optionaly decrease product stock here, or do it in a transaction for more safety
            // product.stock -= cartitem.quantity;
            // await product.save(); // Consider doing this within a transaction for atomicity
        }     

        const newOrder = new Order({
            user: req.user.id,
            products: orderItems,
            totalAmount,
            shippingDetails,
            paymentMethod,
            doNotCall: doNotCall || false,
            deliveryToAnotherPerson: deliveryToAnotherPerson || false,
            notes,
            ...(deliveryToAnotherPerson ? { recipientFirstName, recipientLastName } : {}) // Conditionally add recipient names
        });

        const order = await newOrder.save();

        // Clear user's cart after order is placed
        user.cart = [];
        await user.save();

        res.json(order); // Respond with the created order

    }   catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};


// @route   GET api/orders/:id
// @desc    Get order details bi ID
// @access  Private (User must be logged in)
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
                                    .populate('user', 'firstName lastName email') // Populate user info
                                    .populate('products.product', 'name images price'); // Populate product details

        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        // Check if the order belongs to the logged-in user
        if (order.user.id.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized to view this order' }); // 401 Unauthorized
        }

        res.json(order);

    }   catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Order not found' });
        }
        res.status(500).json({ msg: 'Server Error' });
    }
};