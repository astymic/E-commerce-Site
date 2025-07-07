const Joi = require('joi');

exports.validateAddress = (req, res, next) => {
    const schema = Joi.object({
        type: Joi.string().valid('store', 'post', 'address').required().label('Address Type'),
        city: Joi.string().required().label('City'),
        location: Joi.string().required().min(3).max(255).label('Location/Address'),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return next({ error: error });
    }
    next();
};