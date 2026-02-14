const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');
const mongoose = require('mongoose');


// @route   POST api/orders
// @desc    Create a new order
// @access  Private (User must be logged in)
exports.createOrder = async (req, res) => {
  console.log('--- START CREATE ORDER ---');
  console.log('Body:', JSON.stringify(req.body, null, 2));
  console.log('User ID:', req.user.id);

  let session = null;
  let useTransaction = false;

  // ONLY attempt transactions if explicitly requested or if we are sure it's a replica set
  // For now, let's disable them to FIX the 500 error for the user.
  console.log('Transactions disabled for compatibility with standalone MongoDB');

  try {
    const {
      shippingDetails,
      paymentMethod,
      doNotCall,
      deliveryToAnotherPerson,
      recipientFirstName,
      recipientLastName,
      notes
    } = req.body;

    if (!shippingDetails || !paymentMethod) {
      console.log('Validation Error: Missing shippingDetails or paymentMethod');
      return res.status(400).json({ msg: 'Shipping details and payment method are required' });
    }

    const { firstName, lastName, phone, type, city } = shippingDetails;
    if (!firstName || !lastName || !phone || !type || !city) {
      console.log('Validation Error: Incomplete shipping details');
      return res.status(400).json({ msg: 'Shipping details incomplete' });
    }

    console.log('Fetching user and cart...');
    const user = await User.findById(req.user.id).populate('cart.product');
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ msg: 'User not found' });
    }

    if (!user.cart || user.cart.length === 0) {
      console.log('Cart is empty');
      return res.status(400).json({ msg: 'Cart is empty' });
    }

    let orderItems = [];
    let totalAmount = 0;

    console.log('Processing cart items...');
    for (let cartItem of user.cart) {
      const product = cartItem.product;
      if (!product) {
        console.log('Product in cart not found');
        return res.status(400).json({ msg: 'One of the products in your cart no longer exists' });
      }

      if (product.stock < cartItem.quantity) {
        console.log(`Out of stock: ${product.name}`);
        return res.status(400).json({ msg: `Product "${product.name}" is out of stock` });
      }

      const purchasePrice = (product.discountPrice && product.discountPrice < product.price)
        ? product.discountPrice
        : product.price;

      orderItems.push({
        product: product._id,
        quantity: cartItem.quantity,
        priceAtPurchase: purchasePrice
      });
      totalAmount += purchasePrice * cartItem.quantity;

      // Update Stock
      product.stock -= cartItem.quantity;
      await product.save();
    }

    console.log('Creating new order document...');
    const newOrder = new Order({
      user: req.user.id,
      products: orderItems,
      totalAmount,
      shippingDetails: {
        firstName: shippingDetails.firstName,
        lastName: shippingDetails.lastName,
        phone: shippingDetails.phone,
        type: shippingDetails.type,
        city: shippingDetails.city,
        location: shippingDetails.location || '',
        recipientFirstName: recipientFirstName || '',
        recipientLastName: recipientLastName || '',
        notes: notes || ''
      },
      paymentMethod,
      doNotCall: doNotCall || false,
    });

    console.log('Saving order...');
    const order = await newOrder.save();

    console.log('Clearing user cart...');
    user.cart = [];
    await user.save();

    console.log('--- ORDER CREATED SUCCESSFULLY ---');
    res.json(order);

  } catch (err) {
    console.error('CRITICAL ORDER ERROR:', err);

    // Log error to file for persistent debugging
    const errorLog = `[${new Date().toISOString()}] CRITICAL ORDER ERROR: ${err.message}\nStack: ${err.stack}\n\n`;
    try {
      fs.appendFileSync(path.join(process.cwd(), 'debug_log.txt'), errorLog);
    } catch (e) { }

    res.status(500).json({
      msg: 'Server Error during order creation',
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
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

    const requestingUser = await User.findById(req.user.id);
    if (!requestingUser) {
      return res.status(404).json({ msg: 'Requesting user not found' });
    }

    // Check if the order belongs to the logged-in user
    if (order.user.id.toString() !== req.user.id && requestingUser.role !== 'admin') {
      return res.status(401).json({ msg: 'Not authorized to view this order' }); // 401 Unauthorized
    }

    res.json(order);

  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Order not found' });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
};