const Joi = require('joi');

exports.validateRegistration = (req, res, next) => {
    const schema = Joi.object({
        firstName: Joi.string().required().min(2).max(50).label('First Name'),
        lastName: Joi.string().required().min(2).max(50).label('Last Name'),
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().required().min(6).label('Password'),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ msg: error.details[0].message });
    }
    next();
};


exports.validateLogin = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().required().min(6).label('Password'),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ msg: error.details[0].message });
    }
    next();
};
