const { depositSchema } = require("../validators/deposit-validator");
const constantCoin = require("../util/constant/coin")
const constantStatus = require("../util/constant/status")
const prisma = require("../models/prisma");
const constantFee = require("../util/constant/fee")

exports.create = async (req, res, next) => {

    try{
        const value = req.body;
       
        //get username from Auth
        const userId = 1

        let bodyRequest = {
            amount: value?.amount,
            user_id: userId,
        }

        const createHistoryPayment = await prisma.history_payment.create({
            data: bodyRequest,
        });

        const findCoinListUSDT = await prisma.coin_list.findFirst({
            where: {
                coin_name: constantCoin.USDT
            }
        });

        const newAmountUpdateInTableCoinList = parseFloat(findCoinListUSDT?.quantity) - parseFloat(value?.amount);
        await prisma.coin_list.update({
            where: {
                coin_list_id: findCoinListUSDT?.coin_list_id
            },
            data: {
                quantity: newAmountUpdateInTableCoinList
            }
        });

        const Fee = constantFee?.FEE
        const fee = (parseFloat(value?.amount) * parseFloat(Fee))
        let bodyTransaction = {
            coin_name: constantCoin.USDT,
            type: constantStatus.BUY,
            price: value?.amount,
            quantity: value?.amount,
            fee: fee,
            user_id: userId,
            status: constantStatus?.ACTIVE
        }
        
        await prisma.transaction.create({
            data: bodyTransaction,
        });

        let bodyNewCoinInPortfolio = {
            coin_name: constantCoin.USDT,
            average_purchase_price: 0.00,
            quantity: value?.amount,
            profit_or_loss: 0.00,
            weight: 0,
            user_id: userId
        }

        await prisma.portfolio.create({
            data: bodyNewCoinInPortfolio,
        });

        let response = {
            status: constantStatus.SUCCEDD,
            createHistoryPayment: createHistoryPayment
        }

        console.log("createHistoryPayment: --------> ", createHistoryPayment);
        res.status(201).json({ response });
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

        let bodyRequest = {
            amount: value?.amount,
            user_id: userId,
        }

        await prisma.history_payment.create({
            data: bodyRequest,
        });


        const findCoinListUSDT = await prisma.coin_list.findFirst({
            where: {
                coin_name: constantCoin.USDT
            }
        });

        const newAmountUpdateInTableCoinList = parseFloat(findCoinListUSDT?.quantity) - parseFloat(value?.amount);
        await prisma.coin_list.update({
            where: {
                coin_list_id: findCoinListUSDT?.coin_list_id
            },
            data: {
                quantity: newAmountUpdateInTableCoinList
            }
        });


        const Fee = constantFee?.FEE
        const fee = (parseFloat(value?.amount) * parseFloat(Fee))
        let bodyTransaction = {
            coin_name: constantCoin.USDT,
            type: constantStatus.BUY,
            price: value?.amount,
            quantity: value?.amount,
            fee: fee,
            user_id: userId,
            status: constantStatus?.ACTIVE
        }
        await prisma.transaction.create({
            data: bodyTransaction,
        });

        const findOldUsdtInPortfolio = await prisma.portfolio.findFirst({
            where: {
                AND: [{coin_name: constantCoin.USDT}, {user_id: userId}]
            }
        })

        const newAmount = parseFloat(findOldUsdtInPortfolio?.quantity) + parseFloat(value?.amount);


        const checkPortfolioRelationship = await prisma.portfolio.findFirst({
            where: {
                AND: [{coin_name: constantCoin.USDT},{user_id: userId}]
            }
        })
  
        await prisma.portfolio.update({
            data: {
                weight: 0,
                average_purchase_price: 0,
                profit_or_loss: 0,
                quantity: newAmount,
            },
            where: {
                portfolio_id: checkPortfolioRelationship.portfolio_id,
                AND: [
                    { user_id: userId },
                    { coin_name: constantCoin.USDT }
                ]
            }
        });

        let response = {
            status: constantStatus.SUCCEDD,
            newAmount: newAmount
        }

        console.log("updateHistoryPayment: --------> Succeed !");
        res.status(201).json({ response });
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
            status: constantStatus.SUCCEDD,
            validate: validate
        }       
        console.log("validate: --------> ", response);
        res.status(201).json({ response });
    } catch (err) {
        next(err);
    }
}






