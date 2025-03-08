const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');
const mongoose = require('mongoose');


// @route   POST api/orders
// @desc    Create a new order
// @access  Private (User must be logged in)
exports.createOrder = async (req, res) => {
  // Start a MongoDB session for transaction
  const session = await mongoose.startSession();
  session.startTransaction(); // Start transaction

  try {
    const { shippingDetails, paymentMethod, doNotCall, deliveryToAnotherPerson, recipientFirstName, recipientLastName, notes } = req.body;

    // ... (Input validation - keep your existing validation logic) ...
    if (!shippingDetails || !paymentMethod) {
      await session.abortTransaction(); // Abort transaction on validation failure
      session.endSession();
      return res.status(400).json({ msg: 'Shipping details and payment method are required' });
    }
    if (!shippingDetails.firstName || !shippingDetails.lastName || !shippingDetails.phone || !shippingDetails.type || !shippingDetails.city) {
      await session.abortTransaction(); // Abort transaction on validation failure
      session.endSession();
      return res.status(400).json({ msg: 'Shipping details incomplete' });
    }
    if (!['cash_on_delivery', 'prepaid', 'installment'].includes(paymentMethod)) {
      await session.abortTransaction(); // Abort transaction on validation failure
      session.endSession();
      return res.status(400).json({ msg: 'Invalid payment method' });
    }

    const user = await User.findById(req.user.id).populate('cart.product');
    if (!user) {
      await session.abortTransaction(); // Abort transaction if user not found
      session.endSession();
      return res.status(404).json({ msg: 'User not found' });
    }

    if (!user.cart || user.cart.length === 0) {
      await session.abortTransaction(); // Abort transaction if cart is empty
      session.endSession();
      return res.status(400).json({ msg: 'Cart is empty' });
    }

    let orderItems = [];
    let totalAmount = 0;

    for (let cartItem of user.cart) {
      const product = cartItem.product;
      if (!product) {
        await session.abortTransaction(); // Abort transaction if product in cart not found
        session.endSession();
        return res.status(400).json({ msg: 'Product in cart not found' });
      }
      if (product.stock < cartItem.quantity) {
        await session.abortTransaction(); // Abort if insufficient stock
        session.endSession();
        return res.status(400).json({ msg: `Product "${product.name}" is out of stock for the requested quantity` });
      }

      orderItems.push({
        product: product._id,
        quantity: cartItem.quantity,
        priceAtPurchase: product.price
      });
      totalAmount += product.price * cartItem.quantity;

      // Decrease product stock - WITHIN TRANSACTION
      product.stock -= cartItem.quantity;
      await product.save({ session }); // Pass session to save operation - IMPORTANT for transaction
    }

    const newOrder = new Order({
      user: req.user.id,
      products: orderItems,
      totalAmount,
      shippingDetails,
      paymentMethod,
      doNotCall: doNotCall || false,
      deliveryToAnotherPerson: deliveryToAnotherPerson || false,
      recipientFirstName,
      recipientLastName,
      notes,
      // ... (rest of your order fields)
    });

    const order = await newOrder.save({ session }); // Pass session to save operation - IMPORTANT for transaction

    // Clear user's cart - WITHIN TRANSACTION
    user.cart = [];
    await user.save({ session }); // Pass session to save operation - IMPORTANT for transaction

    await session.commitTransaction(); // Commit transaction if all operations succeed
    session.endSession(); // End session

    res.json(order); // Respond with the created order

  } catch (err) {
    await session.abortTransaction(); // Abort transaction on any error
    session.endSession(); // End session

    console.error(err.message);
    res.status(500).send('Server Error');
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