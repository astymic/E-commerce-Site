const mongoose = require('mongoose');
const Category = require('../models/Category');
const Product = require('../models/Product');


// @route   POST api/categories
// @desc    Create a new category
// @access  Public (for now, will be Admin protected later)
exports.createCategory = async (req, res) => {
    try {
        const { name, description, parentCategory } = req.body;
        
        // Simple validation (add more robust validation later)
        if (!name) {
            return res.status(400).json({ msg: 'Name is required' });
        }

        // Check if category name already exist (unique name)
        const categoryExists = await Category.findOne({ name });
        if (categoryExists) {
            return res.status(400).json({ msg: 'Category name already exists' });
        }

        // Create slug from name (basoc implementation, improve later for better slug generation)
        const slug = name.toLowerCase().replace(/\s+/g, '-');

        const newCategory = new Category({
            name,
            slug,
            description,
            parent: parentCategory || null  // Assuming parentCategory is sent in request body
        });

        const category = await newCategory.save();
        res.json(category); // Send back the created category
    }   catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// @route   GET api/categories
// @desc    Get categories
// @access  Public
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate('parent', 'name'); // Populate parent category name
        res.json(categories);
    }   catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// @route   GET api/categories/:id
// @desc    Get category by ID
// @access  Public
exports.getCategoryById = async (req, res) => {
    try {
        const identfier = req.params.id;
        let query;

        if (mongoose.Types.ObjectId.isValid(identfier)) {
            query = { _id: identfier };
        } else {
            query = { slug: identfier };
        }

        const category = await Category.findOne(query).populate('parent', 'name slug');

        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }
        res.json(category);

    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {  
            return res.status(404).json({ msg: 'Category not found' });
        }
        res.status(500).send('Server Error');
    }
};


// @route   PUT api/categories/:id
// @desc    Update category
// @access  Public (for now, will be Admin protected later)
exports.updateCategory = async (req, res) => {
    try {
        const { name, description, parentCategory } = req.body;
    
        // Simple validation (add more robus validation later)
        if (!name) {
            return res.status(400).json({ msg: 'Name is required' });
        }

        // Create slug from name
        const slug = name.toLowerCase().replace(/\s+/g, '-');

        const categoryFields = {};
        categoryFields.name = name;
        categoryFields.slug = slug;
        categoryFields.description = description;
        if (parentCategory) categoryFields.parent = parentCategory;

        let category = await Category.findById(req.params.id);

        if (!category) return res.status(404).json({ msg: 'Category not found' });

        category = await Category.findByIdAndUpdate(
            req.params.id,
            { $set: categoryFields },
            { new: true } // Return the modified document
        );

        res.json(category); // Send bakc the update category
        }   catch (err) {
            console.error(err.message);
            if (err.kind === 'ObjectId') {
                return res.status(404).json({ msg: 'Category not found' });
            }
            res.status(500).send('Server Error');
        }
};


// @route   GET api/categories/:categoryId/products
// @desc    Get products in a specific category
// @access  Public
exports.getCategoryProducts = async (req, res) => {
    try {
        const identifier = req.params.categoryId;
        const { sortBy, ...filterParams} = req.query;

        let categoryQuery;
        if (mongoose.Types.ObjectId.isValid(identifier)) {
            categoryQuery = { _id: identifier };
        } else {
            categoryQuery = { slug: identifier };
        }

        const category = await Category.findOne(categoryQuery);
        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }


        // --- Apply Sorting ---
        let sortOptions = {};
        if (sortBy === 'price-low-to-high') sortOptions = { price: 1 }; 
        else if (sortBy === 'price-high-to-low') sortOptions = { price: -1 }; 
        else if (sortBy === 'newest') sortOptions = { createdAt: -1 };

        let productQuery = { category: category._id };
        // let query = { category: categoryId };
        let specFilters = [];

        for (const filterName in filterParams) {
            const filterValueString = filterParams[filterName];
            if (!filterValueString) continue;

            if (filterName === 'Price Range-min' || filterName === 'Price Range-max' ) {
                const priceQuery = productQuery.price || {};
                const priceVal = parseFloat(filterValueString);
                if (!isNaN(priceVal)) {
                    if (filterName.endsWith('-min')) priceQuery.$gte = priceVal;
                    if (filterName.endsWith('-max')) priceQuery.$lte = priceVal;
                    productQuery.price = priceQuery;
                }
                continue;
            }

            const filterDefinition = category.filters.find(f => f.name === filterName);
            if (filterDefinition) {
                if (filterDefinition.type === 'checkbox') {
                    const checkboxOption = filterValueString.split(',');
                    if (checkboxOption.length > 0) {
                    specFilters.push({
                        specifications: { $elemMatch: { name: filterName, value: { $in: checkboxOption } } }
                    });
                  }
                } else if (filterDefinition.type === 'radio') {
                    specFilters.push({
                        specifications: { $elemMatch: { name: filterName, value: filterValueString } }
                    });
                } else if (filterDefinition.type === 'range') {
                    const [minVal, maxVal] = filterValueString.split(',').map(Number);
                    const rangeQuery = {};
                    if (!isNaN(minVal)) rangeQuery.$gte = minVal;
                    if (!isNaN(maxVal)) rangeQuery.$lte = maxVal;
                    if (Object.keys(rangeQuery).length > 0) {
                        specFilters.push({
                            specifications: { $elemMatch: { name: filterName, value: rangeQuery } }
                        });
                    }                        
                }
            }
        }

        if (specFilters.length > 0) {
            productQuery.$and = (productQuery.$and || []).concat(specFilters);
        }

        const products = await Product.find(productQuery)
            .populate('category', 'name')
            .populate('subcategory', 'name')
            .sort(sortOptions);

        res.json(products);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Invalid Category ID' });
        }
        res.status(500).send('Server Error');
    }
};


// @route   DELETE api/categories/:id
// @desc    Delete category
// @access  Public (for now, will be Admin protected later)
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }

        await Category.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Category deleted' });
    }   catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Category not found' });
        }
        res.status(500).send('Server Error');
    }
};