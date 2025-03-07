const express = require('express');
const router = express.Router();
const productController = require('../../controllers/productController');
const { validateProduct } = require('../../validation/productValidation'); // Hide all lines with this check - if you want to make "solo" store (only official store products)


// @route   POST api/products
// @desc    Create a new product
// @access  Public
router.post('/', validateProduct, productController.createProduct);


// @route   GET api/products
// @desc    Get all products (or filter by category using query param e.g., ?category=categoryId) 
// @access  Public
router.get('/', productController.getProducts);


// @route   GET api/products
// @desc    Get product by ID
// @access  Public
router.get('/:id', productController.getProductById);


// @route   PUT api/products/:id
// @desc    Update product
// @access  Public
router.put('/:id', validateProduct, productController.updateProduct);


// @route   DELETE api/products/:id
// @desc    Create a new product
// @access  Public
router.delete('/:id', productController.deleteProduct);


module.exports = router;