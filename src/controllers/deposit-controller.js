const { depositSchema } = require("../validators/deposit-validator");
const constantStatus = require("../util/constant/status")
const prisma = require("../models/prisma");
const { response } = require("express");



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


exports.update = async (req, res, next) => {
    try {
        const { value, error } = depositSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        const userId = 1;
        const findHistoryPayment = await prisma.history_payment.findFirst({
            where: {
                user_id: userId
            }
        });

        if (!findHistoryPayment) {
            return res.status(404).json({ message: 'History payment not found for the user.' });
        }

        const newAmount = parseFloat(findHistoryPayment?.amount) + parseFloat(value?.amount);

        const updateHistoryPayment = await prisma.history_payment.update({
            where: {
                history_payment_id: findHistoryPayment?.history_payment_id 
            },
            data: {
                amount: newAmount
            }
        });

        console.log("updateHistoryPayment: --------> ", updateHistoryPayment);
        res.status(201).json({ updateHistoryPayment });
    } catch (err) {
        next(err);
    }
}



exports.validate = async (req, res, next) => {
    try {
        let request = req.body;
        const userId = 1;
        const findHistoryPayment = await prisma.history_payment.findFirst({
            where: {
                user_id: request?.user_id
            }
        });

        let validate;

        if (!findHistoryPayment) {
            validate = false
        }else{
            validate = true
        }

        const response = {
            validate: validate
        }       
        console.log("validate: --------> ", response);
        res.status(201).json({ response });
    } catch (err) {
        next(err);
    }
}






