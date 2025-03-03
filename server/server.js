const express = require('express');
const connectDB = require('./config/db');
const app = express();
const port = process.env.PORT || 5000; // Default 5000

// Connect Database
connectDB();

// Init Middleware - bodyparser (for parsing request bodies)
app.use(express.json({ extended: false }));

// Define Routes - Mount the category routes
app.use('/api/categories', require('./routes/api/categories'));

app.get('/', (req, res) => {res.send('Backend server is running!');});

app.listen(port, () => {console.log(`Server is running on port ${port}`);});
