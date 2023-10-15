const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().email().trim().required(),
  username: Joi.string().trim().required(), // Add username field
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{8,30}$/)
    .trim()
    .required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .trim()
    .required()
    .strip(),
});

exports.registerSchema = registerSchema;

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

exports.loginSchema = loginSchema;
