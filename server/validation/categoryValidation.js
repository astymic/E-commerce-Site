const Joi = require('joi');

exports.validateCategory = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required().min(2).max(50).label('Category Name'), 
        description: Joi.string().max(500).label('Description'),
        parentCategory: Joi.string().hex().length(24).allow(null, '').label('Parent Category ID'), // Assuming MongoDB ObjectId for parent
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ msg: error.details[0].message });
    }
    next();
};