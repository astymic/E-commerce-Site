const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/categoryController'); 
// const { validateCategory } = require('../../validation/categoryValidation'); // Make active only if want give User - rights to create and change Categories


// @route   POST api/categories
// @desc    Create a new category
// @access  Public
// router.post('/', validateCategory, categoryController.createCategory);


// @route   GET api/categories
// @desc    Get all categories
// @access  Public
router.get('/', categoryController.getCategories);


// @route   GET api/categories/:id
// @desc    Get category by ID
// @access  Public
router.get('/:id', categoryController.getCategoryById);


// @route   PUT api/categories/:id
// @desc    Update category 
// @access  Public
// router.put('/:id', validateCategory, categoryController.updateCategory);


// @route   DELETE api/categories/:id 
// @desc    Delete category
// @access  Public
// router.delete('/:id', categoryController.deleteCategory);


module.exports = router;