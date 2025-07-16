const mongoose = require('mongoose');
const config = require('config');
const Schema = mongoose.Schema;


const productSchema = new Schema({
    name: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    subcategory: { type: Schema.Types.ObjectId, ref: 'Category' },                  // Optional subcategory
    price: { type: Number, required: true },
    discountPrice: { type: Number, min: 0 },                                        // Optional subcategory
    description: { type: String, required: true },
    shortDescription: { type: String },
    specifications: [{ name: String, value: String }],                              // Array of key-value pairs
    images: [String],                                                               // Array of images URLs or paths
    rating: { type: Number, default: 0, min: 0, max: 5 },                           // Avarage rating
    reviews: [{
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        username: String,                                                           // Or fetch from User model
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: String,
        date: { type: Date, default: Date.now }
    }],
    stock: { type: Number, default: 0, min: 0 },
    isPromotion: { type: Boolean, default: false },
    isNew: { type: Boolean, default: true },
    isTopSelling: { type: Boolean, default: false },
    creatdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },

    // --- Filter Params ---

    // --- Graphic card ---
    // memorySize: String
}, {
    toJSON: {
        transform: function(doc, ret) {
            if (ret.images && Array.isArray(ret.images)) {
                ret.images = ret.images.map(imagePath => {
                    if (imagePath && !imagePath.startsWith('http')) {
                        return `${config.get('BASE_URL')}/${imagePath}`;
                    }
                    return imagePath;
                });
            }
            return ret;
        }
    }
});


module.exports = mongoose.model('Product', productSchema);