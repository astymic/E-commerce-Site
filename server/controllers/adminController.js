const Product = require('../models/Product');
const Category = require('../models/Category');
const Order = require('../models/Order');
const User = require('../models/User');


// --- Admin Category Management ---

// @route   POST api/admin/categories
// @desc    Create a new category (Admin)
// @access  Private - Admin only
exports.adminCreateCategory = async (req, res) => {
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


// @route   GET api/admin/categories
// @desc    Get category (Admin)
// @access  Private - Admin only
exports.adminGetCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate('parent', 'name'); // Populate parent category name
        res.json(categories);
    }   catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// @route   GET api/admin/categories/:id
// @desc    Get category by ID (Admin)
// @access  Private - Admin only
exports.adminGetCategoryById = async (req, res) => {
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


// @route   PUT api/admin/categories/:id
// @desc    Update category (Admin)
// @access  Private - Admin only
exports.adminUpdateCategory = async (req, res) => {
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


// @route   DELETE api/admin/categories/:id
// @desc    Delete category (Admin)
// @access  Private - Admin only
exports.adminDeleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }

        // ---  Optionaly checks here before deleting a category, e.g., ---
        // ---  check if there are products in this category, and handle accordingly ---
        const productInCategory = await Product.find({ category: req.params.id });
        if (productInCategory.length > 0) {
            return res.status(400).json({ msg: 'Cannot delete category with products. Move products firts.' });
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


// --- Admin Product Management ---

// @route   POST api/admin/products
// @desc    Create a new product (Admin)
// @access  Private - Admin only
exports.adminCreateProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            shortDescription,
            price,
            discountPrice,
            category,
            subcategory,
            specifications,
            images,
            stock,
            isPromotion,
            isNew,
            isTopSelling,
        } = req.body;

        // Validation
        if (!name || !description || !price || !category) {
            return res.status(400).json({ mgs: 'Name, description, price and category are required' });
        }

        // Check if category exist
        const categoryExist = await Category.findById(category);
        if (!categoryExist) {
            return res.status(400).json({ msg: 'Category not found' });
        }

        // Create new product instance
        const newProduct = new Product({
            name,
            description,
            shortDescription,
            price,
            discountPrice,
            category,
            subcategory: subcategory || null, // Optional
            specifications: specifications || [], // Optional
            images: images || [], // Optional
            stock: stock || 0, // Default 0 if not provided
            isPromotion: isPromotion || false, 
            isNew: isNew !== undefined ? isNew : true, // Default isNew to true if not provided
            isTopSelling: isTopSelling || false,
        });

        const product = await newProduct.save();
        res.json(product);

    }   catch (err) {
        console.error(err.nessage);
        res.status(500).send('Server Error')
    }
};


// @route   GET api/admin/products
// @desc    Get all products (Admin)
// @access  Private - Admin only
exports.adminGetProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate('category', 'name')   
            .populate('subcategory', 'name');   
        res.json(products);
    }   catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// @route   GET api/admin/products/:id
// @desc    Get product by ID (Admin)
// @access  Privat - Admin only
exports.adminGetProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('category', 'name')
            .populate('subcategory', 'name');

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.json(product);
    }   catch (err) {
        console.error(err.message);
        if (err.kind === 'Objectid') {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(500).send('Server Error');
    }
};



// @route   PUT api/admin/products/:id
// @desc    Update product (Admin)
// @access  Privat - Admin only
exports.adminUpdateProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            shortDescription,
            price,
            discountPrice,
            category,
            subcategory,
            specifications,
            images,
            stock,
            isPromotion,
            isNew,
            isTopSelling,
        } = req.body;

        // Validation - ensure category exists if provided
        if (category) {
            const categoryExist = await Category.findById(category);
            if (!categoryExist) {
                return res.status(400).json({ msg: 'Category not found' });
            }
        }
        if (subcategory) {
            const subcategoryExist = await Category.findById(subcategory);
            if (!subcategoryExist) {
                return res.status(400).json({ msg: 'Subcategory not found' });
            }
        }
        

        const productFileds = {};
        if (name) productFileds.name = name;
        if (description) productFileds.description = description;
        if (shortDescription) productFileds.shortDescription = shortDescription;
        if (price) productFileds.price = price;
        if (discountPrice) productFileds.discountPrice = discountPrice;
        if (category) productFileds.category = category;
        if (subcategory) productFileds.subcategory = subcategory;
        if (images) productFileds.images = images;
        if (stock) productFileds.stock = stock;
        if (isPromotion) productFileds.isPromotion = isPromotion;
        if (isNew !== undefined) productFileds.isNew = isNew; // Allow setting false
        if (isTopSelling) productFileds.isTopSelling = isTopSelling;


        let product = await Product.findById(req.params.id);
        
        if (!product) return res.status(400).json({ msg: 'Product not found' });

        product = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: productFileds },
            { new: true }
        );

        res.json(product);

    }   catch (err) {
        console.error(err.messgae);
        if (err === 'ObjectId') {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(500).send('Server Error');
    }
};


// @route   DELETE api/admin/products/:id
// @desc    Delete product (Admin)
// @access  Privat - Admin only
exports.adminDeleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ msg:'Product not found' });
        }

        await Product.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Product deleted' });
    }   catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(500).send('Server Error');
    }
};


// --- Admin Order Management ---

// @route   GET api/admin/orders
// @desc    Get all orders (Admin)
// @access  Private - Admin only
exports.adminGetOrders = async (req, res) => {
    try {
        const order = await Order.find()
            .populate('user', 'firstName lastName email') // Populate user info
            .populate('products.product', 'name images price'); // Populate product details
        res.json(order);
    }   catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};



// @route   GET api/admin/orders/:id
// @desc    Get order details by ID (Admin)
// @access  Private - Admin only
exports.adminGetOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'firstName lastName email') // Populate user info
            .populate('products.product', 'name images price'); // Populate product details

        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }
        res.json(order);
    }   catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Order not found' });
        }
        res.status(500).send('Server Error');
    }
};


// @route   PUT api/admin/orders/:id/status
// @desc    Update order status (Admin)
// @access  Private - Admin only\
exports.adminUpdateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const orderId = req.params.id;

        if (!status) {
            return res.status(400).json({ msg: 'Order status is required' });
        }
        if (!['processing', 'confirmed', 'shipped', 'delivered', 'canceled'].includes(status)) {
            return res.status(400).json({ msg: 'Invalid order status value' });
        }

        let order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        } 

        order.status = status;
        order = await order.save(); // Save the updated order

        res.json(order); // Return the updated order
    }   catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Order not found' });
        }
        res.status(500).json({ msg: 'Server Error' });
    }
};


// --- Admin User Managemnt ---

// @route   GET api/admin/users
// @desc    Get all users (Admin)
// @access  Private - Admin only
exports.adminGetUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    }   catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// @route   GET api/admin/users/:id
// @desc    Get user by ID (Admin)
// @access  Private - Admin only
exports.adminGetUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    }   catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(500).send('Server Error');
    }
};


// @route   PUT api/admin/users/:id/role
// @desc    Update user role (Admin)
// @access  Private - Admin only
exports.adminUpdateUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        const userId = req.params.id;

        if (!role) {
            return res.status(400).json({ msg: 'User role is required' });
        }
        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({ msg: 'Invalid user role value' });
        }

        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (user.role === role) {
            return res.status(400).json({ msg: `User already has ${role} role` });
        }

        user.role = role;
        await user.save();

        res.json({ msg: `User role updated to '${role}'` });
    
    }   catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(500).send('Server Error');
    }
};



// --- Admin Dashboard ---

// @route   GET api/admin/dashboard
// @desc    Get admin dashboard data
// @access  Private - Admin only
exports.getAdminDashboard = async (req, res) => {
    try {
        // In real dashboard, need fetch various admin-related data here
        const dashboardData = {
            message: '\\Admin Dashboard//',
        };
        res.json(dashboardData);
    }   catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};