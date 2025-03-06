const Joi = requiest('joi');

exports.validationCategory = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required().min(2).max(50).label('Category Name'),
        description: Joi.string().max(500).label('Description'),
        parentCategory: Joi.string().hex().legth(24).allow(null, '').label('Parent CAtegory ID'), // Assuming MongoDB ObjectId for parent
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ msg: error.details[0].message });
    }
    next();
};