const Joi = require("joi");

const transactionSchema = Joi.object({
    coin_name: Joi.string().required(),
    type: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    fee: Joi.number(),
    user_id: Joi.number()
}).options({ stripUnknown: true }); // This line will remove unknown properties

exports.transactionSchema = transactionSchema;
