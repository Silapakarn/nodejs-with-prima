const { depositSchema } = require("../validators/deposit-validator");
const constantStatus = require("../util/constant/status")
const prisma = require("../models/prisma");
exports.create = async (req, res, next) => {

    try{
        const { value, error } = depositSchema.validate(req.body);
        if (error) {
            return next(error);
        }
        //get username from Auth
        const userId = 1

        let bodyRequest = {
            amount: value?.amount,
            user_id: userId,
        }

        const createHistoryPayment = await prisma.history_payment.create({
            data: bodyRequest,
        });

        console.log("createHistoryPayment: --------> ", createHistoryPayment);
        res.status(201).json({ createHistoryPayment });
    }catch (err) {
        next(err);
    }
}
