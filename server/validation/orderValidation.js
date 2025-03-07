const Joi = require('joi');

exports.validateOrder = (req, res, next) => {
    const schema = Joi.object({
        shippingDetails: Joi.object({
            firstName: Joi.string().required().min(2).max(50).label('First Name'),
            lastName: Joi.string().required().min(2).max(50).label('Last Name'),
            phone: Joi.string().required().label('Shipping Phone Number'),
            type: Joi.string().valid('store', 'post', 'address').required().label('Shipping Type'),
            city: Joi.string().required().label('Shipping City'),
            location: Joi.string().label('Shipping Location'),
        }).required().label('Shipping Details'),
        paymentMethod: Joi.string().valid('cash_on_delivery', 'prepaid', 'installment').required().label('payment Method'),
        doNotCall: Joi.boolean().label('Do Not Call'),
        deliveryToAnotherPerson: Joi.boolean().label('Delivery to Another Person'),
        recipientFirstName: Joi.string().min(2).max(50).when('deliveryToAnotherPerson', { is: true, then: Joi.required() }).label('Recipient First Name'),
        recipientLastName: Joi.string().min(2).max(50).when('deliveryToAnotherPerson', { is: true, then: Joi.required() }).label('Recipient Last Name'),
        notes: Joi.string().max(500).label('Order Notes'),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return next({ error: error });
    }
    next();
};

