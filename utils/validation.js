const Joi = require('@hapi/joi');
const { User } = require('../models/User');

// Register Validation
const registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().custom(uniqueValidator),
        email: Joi.string().email().min(6).max(255).required(),
        password: Joi.string().min(6).max(1024).required(),
        role: Joi.string().required(),
        status: Joi.string().required(),
    });

    return schema.validate(data);
};

// Login Validation
const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().min(6).max(1024).required(),
    });

    return schema.validate(data);
};

const uniqueValidator = async (value) => {
    const count = await User.countDocuments({ username: value });
    if (count > 0) {
        throw new Error('Username must be unique');
    }
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;