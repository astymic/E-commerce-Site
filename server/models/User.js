const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true }, // Hashed pasword
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    savedAddresses: [{
        type: { type: String, enum: ['store', 'post', 'address'] },
        city: String,
        location: String,   // Store location, post office number, or street adress
        isDefault: { type: Boolean, default: false }
    }],
    paymentPreferences: {
        preferredMethod: String,
        savedCards: [{ type: String }]  // Store only last 4 digits and card type for display
    },
    wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }], // Array of product IDs in wishlist
    cart: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, default: 1 } // Default 1
    }],
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('User', userSchema);