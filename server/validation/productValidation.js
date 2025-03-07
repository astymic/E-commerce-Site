const Joi = require('joi');

exports.validateProduct = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required().min(2).max(100).label('product Name'),
        description: Joi.string().required().min(10).label('Description'),
        shortDescription: Joi.string().max(255).label('Short Description'),
        price: Joi.number().min(0).label('Price'),
        discountPrice: Joi.number().min(0).label('Descount Price'),
        category: Joi.string().hex().length(24).required().label('Category ID'),
        subcategory: Joi.string().hex().length(24).allow(null, '').label('Subcategory ID'),
        specifications: Joi.array().items(Joi.object({
            name: Joi.string().required().label('Specification Name'),
            value: Joi.string().required().label('Specification Value')
        })).label('Specifications'),
        images: Joi.array().items(Joi.string().uri()).label('Images URLs'),
        stock: Joi.number().integer().min(0).label('Stock'),
        isPromotion: Joi.boolean().label('Is Promotion'),
        isNew: Joi.boolean().label('Is New'),
        isTopSelling: Joi.boolean().label('Is Top Selling'),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ msg: error.details[0].message });
    }
    next();
};