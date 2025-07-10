const express = require('express');
const router = express.Router();
const productController = require('../../controllers/productController');
const auth = require('../../middleware/auth');
const upload = require('../../middleware/upload');

const { validateProduct } = require('../../validation/productValidation'); // Hide all lines with this check - if you want to make "solo" store (only official store products)
                                                                           // and 

// @route   POST api/products
// @desc    Create a new product
// @access  Public
router.post('/', validateProduct, productController.createProduct);


// @route   POST api/products/:id/reviews
// @desc    Add a product review
// @access  Private
router.post('/:id/reviews', auth, productController.addProductReview);


// @route   GET api/products
// @desc    Get all products (or filter by category using query param e.g., ?category=categoryId) 
// @access  Public
router.get('/', productController.getProducts);


// @route   GET api/products/promotions
// @desc    Get promotional products
// @access  Public
router.get('/promotions', productController.getPromotionalProducts);


// @route   GET api/products/top-selling
// @desc    Get top-selling products 
// @access  Public
router.get('/top-selling', productController.getTopSellingProducts);


// @route   GET api/products/new-arrivals
// @desc    Get top-selling products 
// @access  Public
router.get('/new-arrivals', productController.getNewArrivalsProducts);


// @route   GET api/products
// @desc    Get product by ID
// @access  Public
router.get('/:id', productController.getProductById);


// @route   GET api/products/:id/similar
// @desc    Get similar products
// @access  Public
router.get('/:id/similar', productController.getSimilarProducts);


// @route   PUT api/products/:id
// @desc    Update product
// @access  Public
router.put('/:id', validateProduct, productController.updateProduct);


// @route   DELETE api/products/:id
// @desc    Create a new product
// @access  Public
router.delete('/:id', productController.deleteProduct);



// @route   POST api/upload/product-image
// @desc    Upload a product image
// @access  Public
// 'productImage' is field name for the file input in the fronted from
router.post('/upload/product-image', upload.single('productImage'), productController.uploadImage);



module.exports = router;