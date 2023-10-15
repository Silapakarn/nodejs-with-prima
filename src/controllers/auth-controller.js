const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerSchema, loginSchema } = require("../validators/auth-validator");
const prisma = require("../models/prisma");
const createError = require("../util/create-error");

exports.register = async (req, res, next) => {
  try {
    const { value, error } = registerSchema.validate(req.body);
    console.log(value);
   
    if (error) {
      return next(error);
    }
    console.log(value.password ,'password')
    value.password = await bcrypt.hash(value.password, 12);
    const user = await prisma.user.create({
      data: value,
    });
    console.log("user", user);

    const payload = { userId: user.user_id };
    console.log("payload", payload);
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY || "1q1w1w1we22e2ee2r33r",
      { expiresIn: process.env.JWT_EXPIRE }
    );

    delete user.password;
    res.status(201).json({ accessToken,user });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { value, error } = loginSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const user = await prisma.user.findFirst({
      where: { username: value.username },
    });

    if (!user) {
      return next(createError('Invalid credentials', 400));
    }

    const isMatch = await bcrypt.compare(value.password, user.password);
    if (!isMatch) {
      return next(createError('Invalid credentials', 400));
    }

    const payload = { userId: user.user_id };

    // expiresIn is set to 14 days in seconds (1209600 seconds)
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY || 'your-secret-key',
      { expiresIn: 1209600 }
    );

    delete user.password;
    res.status(200).json({ accessToken, user });
  } catch (err) {
    next(err);
  }
};
