const mongoose = require('mongoose');
try {
    const Order = require('./models/Order');
    const User = require('./models/User');
    const Product = require('./models/Product');
    const Category = require('./models/Category');
    console.log('All models loaded successfully');
} catch (err) {
    console.error('Error loading models:', err);
    process.exit(1);
}
