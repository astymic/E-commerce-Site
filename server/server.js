const express = require('express');
const fs = require('fs');
const path = require('path');
const connectDB = require('./config/db');
const app = express();
const port = process.env.PORT || 5000; // Default 5000
// const port = 5000; // Default 5000
const errorHandler = require('./middleware/error');


// Connect Database
connectDB();


// Init Middleware - bodyparser 
app.use(express.json({ extended: false })); // Corrected this line


// Request Logger
app.use((req, res, next) => {
    const log = `[${new Date().toISOString()}] ${req.method} ${req.url}\nBody: ${JSON.stringify(req.body, null, 2)}\n\n`;
    try {
        fs.appendFileSync(path.join(process.cwd(), 'debug_log.txt'), log);
    } catch (e) { }
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});


// Static Routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Define Routes 
app.use('/api/categories', require('./routes/api/categories'));
app.use('/api/products', require('./routes/api/products'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/cart', require('./routes/api/cart'));
app.use('/api/orders', require('./routes/api/orders'));
app.use('/api/admin', require('./routes/api/admin'));


app.get('/', (req, res) => { res.send('Backend server is running!'); });


app.use(errorHandler);


app.listen(port, () => { console.log(`Server is running on port ${port}`); });
