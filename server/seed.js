const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('config');
const Category = require('./models/Category');
const Product = require('./models/Product');
const User = require('./models/User');

const db = config.get('mongoURI');

const categoriesData = [
    { name: 'Electronics', slug: 'electronics', description: 'Gadgets and devices' },
    { name: 'Fashion', slug: 'fashion', description: 'Latest trending clothes' },
    { name: 'Home & Kitchen', slug: 'home-kitchen', description: 'Essential home items' },
    { name: 'Beauty', slug: 'beauty', description: 'Skincare and makeup' },
    { name: 'Sports', slug: 'sports', description: 'Athletic gear and equipment' }
];

const seedDB = async () => {
    try {
        await mongoose.connect(db);
        console.log('MongoDB Connected for seeding...');

        // Clear existing data
        await Category.deleteMany({});
        await Product.deleteMany({});
        await User.deleteMany({});
        console.log('Existing data cleared.');

        // Seed Categories
        const createdCategories = await Category.insertMany(categoriesData);
        console.log('Categories seeded.');

        // Seed Users
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);

        const usersData = [
            {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                password: hashedPassword,
                role: 'user'
            },
            {
                firstName: 'Jane',
                lastName: 'Smith',
                email: 'jane@example.com',
                password: hashedPassword,
                role: 'user'
            },
            {
                firstName: 'Bob',
                lastName: 'Johnson',
                email: 'bob@example.com',
                password: hashedPassword,
                role: 'user'
            }
        ];
        await User.insertMany(usersData);
        console.log('Regular users seeded.');

        // Re-create Admin (useful for testing)
        const adminHashedPassword = await bcrypt.hash('admin123', salt);
        await User.create({
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@example.com',
            password: adminHashedPassword,
            role: 'admin'
        });
        console.log('Admin user seeded.');

        // Seed Products (30 products with variations)
        const products = [];
        const categoryIds = createdCategories.map(c => c._id);

        for (let i = 1; i <= 30; i++) {
            const categoryId = categoryIds[i % categoryIds.length];

            // Variations
            let description = `Full detailed description for product ${i}. This is a high-quality item from our store.`;
            if (i % 7 === 0) description = " "; // "Missing" description (minimal string to satisfy required)

            let images = [];
            if (i % 3 !== 0) {
                images = [
                    `https://picsum.photos/seed/prod${i}/800/800`,
                    `https://picsum.photos/seed/prod${i}_2/800/800`
                ];
            }

            let stock = 10;
            if (i % 10 === 0) stock = 1;
            if (i % 11 === 0) stock = 999;

            products.push({
                name: `Premium Product ${i}`,
                category: categoryId,
                price: Math.floor(Math.random() * 200) + 20,
                description: description,
                shortDescription: `Catchy tagline for product ${i}`,
                images: images,
                stock: stock,
                isNew: i % 2 === 0,
                isTopSelling: i % 5 === 0,
                isPromotion: i % 4 === 0,
                discountPrice: i % 4 === 0 ? Math.floor(Math.random() * 15) + 5 : undefined
            });
        }

        await Product.insertMany(products);
        console.log('30 Products seeded with variations.');

        console.log('Database Seeding Completed Successfully!');
        process.exit();
    } catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
};

seedDB();
