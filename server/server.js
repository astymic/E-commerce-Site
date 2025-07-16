const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const app = express();
const port = process.env.PORT || 5000; // Default 5000
// const port = 5000; // Default 5000
const errorHandler = require('./middleware/error');


// Connect Database
connectDB();


// Init Middleware - bodyparser 
app.use(express.json({ extended: false }));


// Static Routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Define Routes 
app.use('/api/categories', require('./routes/api/categories')); 
app.use('/api/products', require('./routes/api/products')); 
app.use('/api/users', require('./routes/api/users'));
app.use('/api/cart', require('./routes/api/cart'));
app.use('/api/orders', require('./routes/api/orders'));
app.use('/api/admin', require('./routes/api/admin'));


app.get('/', (req, res) => {res.send('Backend server is running!');});


app.use(errorHandler);


app.listen(port, () => {console.log(`Server is running on port ${port}`);});
