const express = require('express');
const router = express.Router();

const adminController = require('../../controllers/adminController');
const productController = require('../../controllers/productController');

const adminAuth = require('../../middleware/adminAuth');
const upload = require('../../middleware/upload');

const { validateCategory } = require('../../validation/categoryValidation'); 
const { validateProduct } = require('../../validation/productValidation');



// --- Admin Category Routes ---

// @route   POST api/admin/categories
// @desc    Create a new category (Admin)
// @access  Private - Admin only
router.post('/categories', adminAuth, validateCategory, adminController.adminCreateCategory);


// @route   GET api/admin/categories
// @desc    Get category by ID (Admin)
// @access  Private - Admin only
router.get('/categories', adminAuth, adminController.adminGetCategories);


// @route   GET api/admin/categories/:id
// @desc    Get category by ID (Admin)
// @access  Private - Admin only
router.get('/categories/:id', adminAuth, adminController.adminGetCategoryById);


// @route   PUT api/admin/categories/:id
// @desc    Update category (Admin)
// @access  Private - Admin only
router.put('/categories/:id', validateCategory, adminAuth, adminController.adminUpdateCategory);


// @route   DELETE api/admin/categories/:id
// @desc    Delete category (Admin)
// @access  Private - Admin only
router.delete('/categories/:id', adminAuth, adminController.adminDeleteCategory);



// --- Admin Product Routes ---

// @route   POST api/admin/products
// @desc    Create a new product (Admin)
// @access  Private - Admin only
router.post('/products', adminAuth, validateProduct, adminController.adminCreateProduct);


// @route   GET api/admin/products
// @desc    Get all products (Admin)
// @access  Private - Admin only
router.get('/products', adminAuth, adminController.adminGetProducts);


// @route   GET api/admin/products/:id
// @desc    Get product by ID (Admin)
// @access  Privat - Admin only
router.get('/products/:id', adminAuth, adminController.adminGetProductById);


// @route   PUT api/admin/products/:id
// @desc    Update product (Admin)
// @access  Privat - Admin only
router.put('/products/:id', adminAuth, validateProduct, adminController.adminUpdateProduct);


// @route   DELETE api/admin/products/:id
// @desc    Delete product (Admin)
// @access  Privat - Admin only
router.delete('/products/:id', adminAuth, adminController.adminDeleteProduct);



// --- Admin Image Upload Routes ---

// @route   POST api/admin/upload/product-image
// @desc    Upload a product image (Admin)
// @access  Privat - Admin only
// 'productImage' is field name for the file input in the fronted from
router.post('/upload/product-image', adminAuth, upload.single('productImage'), productController.uploadImage);


// @route   POST api/admin/upload/category-image
// @desc    Upload a category image (Admin)
// @access  Privat - Admin only
// 'categoryImage' is field name for the file input in the fronted from
router.post('/upload/category-image', adminAuth, upload.single('categoryImage'), productController.uploadImage);



// --- Admin Order Routes ---

// @route   GET api/admin/orders
// @desc    Get all orders (Admin)
// @access  Private - Admin only
router.get('/orders', adminAuth, adminController.adminGetOrders);


// @route   GET api/admin/orders/:id
// @desc    Get order details by ID (Admin)
// @access  Private - Admin only
router.get('/orders/:id', adminAuth, adminController.adminGetOrderById);


// @route   PUT api/admin/orders/:id/status
// @desc    Update order status (Admin)
// @access  Private - Admin only\
router.put('/orders/:id/status', adminAuth, adminController.adminUpdateOrderStatus);



// --- Admin User Routes

// @route   GET api/admin/users
// @desc    Get all users (Admin)
// @access  Private - Admin only
router.get('/users', adminAuth, adminController.adminGetUsers);


// @route   GET api/admin/users/:id
// @desc    Get user by ID (Admin)
// @access  Private - Admin only
router.get('/users/:id', adminAuth, adminController.adminGetUserById);


// @route   PUT api/admin/users/:id/role
// @desc    Update user role (Admin)
// @access  Private - Admin only
router.put('/users/:id/role', adminAuth, adminController.adminUpdateUserRole);



// --- Admin Dashboard ---

// @route   GET api/admin/dashboard
// @desc    Get admin dashboard data 
// @access  Private - Admin only
router.get('/dashboard', adminAuth, adminController.getAdminDashboard);



module.exports = router;