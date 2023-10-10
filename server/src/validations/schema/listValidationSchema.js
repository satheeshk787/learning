const Joi = require("joi");

exports.createValidation = Joi.object({    
    name: Joi.string().required()
});

exports.editValidation = Joi.object({    
    name: Joi.string().required(),
    _id: Joi.string().required()
});

exports.deleteValidation = Joi.object({
    _id: Joi.string().required()
});