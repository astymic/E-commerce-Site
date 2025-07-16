const mongoose = require('mongoose');
const config = require('config');
const Schema = mongoose.Schema;


const categorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true, lowrcase: true },                       // URL-friendly name
    parent: { type: Schema.Types.ObjectId, ref: 'Category', default: null },                    // For hierarchical categories  
    description: String,
    image: String,                                                                              // Category image URL or path
    bannerImage: String,
    filters: [{
        name: String,
        type: { type: String, enum: ['checkbox', 'range', 'radio'], default: 'checkbox' },
        options: [String]                                                                       // Possible filter options for checkbox and radio types
    }],
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
}, {
    toJSON: {
        transform: function(doc, ret) {
            if (ret.image && !ret.image.startsWith('http')) {
                ret.image = `${config.get('BASE_URL')}/${ret.iamge}`;
            }
            if (ret.bannerImage && !ret.bannerImage.startsWith('http')) {
                ret.bannerImage = `${config.get('BASE_URL')}/${ret.bannerImage}`;
            }
            return ret;
        }
    }
});


module.exports = mongoose.model('Category', categorySchema);