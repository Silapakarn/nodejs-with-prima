const Joi = require("joi");

const portfolioSchema = Joi.object({
    coin_name: Joi.string().required(),
    average_purchase_price: Joi.number().required(),
    quantity: Joi.number().required(),
    profit_or_loss: Joi.number().required(),
    weight: Joi.number().required(),
}).options({ stripUnknown: true }); 

exports.portfolioSchema = portfolioSchema;
