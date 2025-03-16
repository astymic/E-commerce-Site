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
        const category = await Category.findById(req.params.id).populate('parent', 'name'); // Populate parent category name
        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }
        res.json(category);
    }   catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {  // Handle invalid ObjcetId format 
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
        const categoryId = req.params.categoryId;
        const sortBy = req.query.sortBy;
        const filterParams = req.query;

        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }


        // --- Apply Sorting ---
        let sortOptions = {};
        if (sortBy === 'price-low-to-high') {
            sortOptions = { price: 1 };
        } else if (sortBy === 'price-high-to-low') {
            sortOptions = { price: -1 };
        } else if (sortBy === 'newest') {
            sortOptions = { createdAt: -1 };
        }

        let query = { category: categoryId };

        for (const filterName in filterParams) {
            if (filterName !== 'sortBy') {
                const filterValues = filterParams[filterName].split(',');

                const filterDefinition = category.filters.find(f => f.name === filterName);
                if (filterDefinition && filterDefinition.type === 'checkbox') {
                    query[`specifications.value`] = { $in: filterValues };
                    query[`specifications.name`] = filterName;
                }
            }
        }


        const products = await Product.find(query)
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