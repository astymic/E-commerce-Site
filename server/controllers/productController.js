const Product = require('../models/Product'); 
const Category = require('../models/Category');


// @route   POST api/products
// @desc    Create a new product
// @access  Public (for now, will be Admin protected later)
exports.createProduct = async (req, res) => {
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


// @route   GET api/products
// @desc    Get all products (with optional category filter)
// @access  Public
exports.getProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, category, priceMin, priceMax, search } = req.query;

        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);

        if (isNaN(pageNumber) || pageNumber < 1) pageNumber = 1;
        if (isNaN(limitNumber) || limitNumber < 1 || limitNumber > 100) limitNumber = 10;

        let query = {};

        // Category Filter
        if (category) {
            query.category = category;
        }

        // Price Range Filter
        if (priceMin !== undefined && priceMax !== undefined) {
            const minPrice = parseFloat(priceMin);
            const maxPrice = parseFloat(priceMax);

            if (!isNaN(minPrice) && !isNaN(maxPrice)) {
                query.price = { $gte: minPrice, $lte: maxPrice }; // Price greater than or equal to min and less than oq equal to max
            } else if (!isNaN(minPrice)) {
                query.price = { $gte: minPrice }; // Price greater than or equal to min
            } else if (!isNaN(maxPrice)) {
                query.price = { $lte: maxPrice }; // Price less than or equal to max
            }
        } else if (priceMin !== undefined) { // Only minPrice provided
            const minPrice = parseFloat(priceMin);
            if (!isNaN(minPrice)) {
                query.price = { $gte: minPrice };
            } 
        } else if (priceMax !== undefined) { // Only maxPrice provided
            const maxPrice = parseFloat(priceMax);
            if (!isNaN(maxPrice)) {
                query.price = { $lte: maxPrice };
            }
        }

        let productQuery = Product.find(query);

        // Seacrh Filte and Score Metadata/Sorting
        if (search) {
            query.$text = { $search: search };
            productQuery = Product.find(query, { score: { $meta: "textScore" } })
                                    .sort({ score: { $meta: "textScore" } });
        } else {
            productQuery = Product.find(query); 
        }


        const products = await productQuery
            .populate('category', 'name')
            .populate('subcategory', 'name')
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);

        const totalProducts = await Product.countDocuments(query);
        const totalPages = Math.ceil(totalProducts / limitNumber);

        res.json({
            products,
            page: pageNumber,
            limit: limitNumber,
            totalPages,
            totalProducts,
        });
    }   catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// @route   GET api/products/:id
// @desc    Get product by ID
// @access  Public
exports.getProductById = async (req, res) => {
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


// @route   PUT api/products/:id
// @desc    Update product
// @access  Public (for now, Admin protected later)
exports.updateProduct = async (req, res) => {
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
        res.status(500).json({ msg: 'Server Error' });
    }
};


// @route   DELETE api/products/:id
// @desc    Delete product
// @access  Public (for now, Admin protected later)
exports.deleteProduct = async (req, res) => {
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
        res.status(500).json({ msg: 'Server Error' });
    }
};



// --- Upload Product Image ---

// @route   POST api/upload/product-image   \   POST api/admin/upload/category-image
// @desc    Upload a product image          \   Upload a category image (Admin)
// @access  Public
exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: 'No file uploaded' });
        }

        // File path wil be available in req.file.path (e.g., 'uploads/productImage-timestamp-random.jpg')
        const filePath = req.file.path;

        res.json({ filePath: filePath.replace(/\\/g,'/') }); // Respond with the file path

    }   catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};