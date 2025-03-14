const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },                                         // Optional: null for guest checkout
    products: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1 },
        priceAtPurchase: { type: Number, required: true }                                       // Price at the time of order
    }],
    totalAmount: { type: Number, required: true, min: 0 },
    shippingDetails: {
        firstName: { type: String, reqired: true },
        lastName: { type: String, reqired: true },
        phone: { type: String, required: true },
        type: { type: String, enum: ['store', 'post', 'address'], required: true },
        city: { type: String, required: true },
        location: { type: String },                                                             // Store/post office location or street address
        recipientFirstName: String,                                                             // Optional, if different from buyer
        recipientLastName: String,                                                              // Optional
        notes: String                                                                           // Customer notes
    },
    paymentMethod: {
        type: String,
        enum: ['cash_on_delivery', 'prepaid', 'installment'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    },
    status: {
        type: String,
        enum: ['processing', 'confirmed', 'shipped', 'delivered', 'canceled'],
        default: 'processing'
    },
    doNotCall: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Order', orderSchema);