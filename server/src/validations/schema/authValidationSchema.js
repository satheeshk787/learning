const Joi = require("joi");

exports.loginValidation = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});