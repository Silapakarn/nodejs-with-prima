const Joi = require("joi");

const depositSchema = Joi.object({
    amount: Joi.number().required(),
    user_id: Joi.number().required()
}).options({ stripUnknown: true }); 

exports.depositSchema = depositSchema;