const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const categorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true, lowrcase: true },   // URL-friendly name
    parent: { type: Schema.Types.ObjectId, ref: 'Category', default: null },    // For hierarchical categories  
    description: String,
    image: String,  // Category image URL or path
    bannerImage: String,
    filtres: [{
        name: String,
        type: { type: String, enum: ['checkbox', 'range', 'radio'], default: 'checkbox' },
        options: [String]   // Possible filter options for checkbox and radio types
    }],
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Category', categorySchema);