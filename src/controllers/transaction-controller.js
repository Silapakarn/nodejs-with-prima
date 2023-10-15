const { transactionSchema } = require("../validators/transaction-validator");
const { portfolioSchema } = require("../validators/portfolio-validator");
const prisma = require("../models/prisma");
const constantFee = require("../util/constant/fee")
const constantStatus = require("../util/constant/status")


exports.create = async (req, res, next) => {

    try {
        const { value, error } = transactionSchema.validate(req.body);
        if (error) {
            return next(error);
        }
        const Fee = constantFee?.FEE

        //get username from Auth
        const userId = 1

        const fee = calculateFee(Fee, value?.quantity, value?.price)
        let bodyRequest = {
            coin_name: value?.coin_name,
            type: value?.type,
            price: value?.price,
            quantity: value?.quantity,
            fee: fee > 0 ? fee : value?.fee,
            user_id: userId,
            status: constantStatus?.ACTIVE
        }
        const createTransaction = await prisma.transaction.create({
            data: bodyRequest,
        });

        const checkCoinListRelationship = await prisma.portfolio.findFirst({
            where: {
                AND: [{coin_name: value?.coin_name},{user_id: userId}]
            }
        })

        // create First portfolio by new coin 
        if(checkCoinListRelationship === null){

            // new averagePurchasePrice
            const averagePurchasePrice = (value?.price * value?.quantity)/(value?.quantity)

            // Hrad Code market price 
            const marketPrice = 1200 * value?.quantity
            const totalInvestments = (value?.price * value?.quantity)

            const profitOrLoss = ((totalInvestments/marketPrice)-1)

            // Calculate weight
            const findTransactionByUserId = await prisma.transaction.findMany({
                where: {
                    AND: [{status: constantStatus?.ACTIVE}, {user_id: userId}]
                }
            })
            const sumInvestmentByUserId = findTransactionByUserId.reduce((sum, data) => {
                const investment = data.price * data.quantity;
                return sum + investment;
            }, 0)

            const findTransactionByCoinName = await prisma.transaction.findMany({
                where: {
                    AND: [{coin_name: value?.coin_name},{status: constantStatus?.ACTIVE}, {user_id: userId}]
                }
            })
            const sumInvestmentsByCoinName = findTransactionByCoinName.reduce((sum, data) => {
                const investment = data.price * data.quantity;
                return sum + investment;
            }, 0)
            
            const weight = sumInvestmentsByCoinName/sumInvestmentByUserId


            let bodyNewCoinInPortfolio = {
                coin_name: value?.coin_name,
                average_purchase_price: averagePurchasePrice,
                quantity: value?.quantity,
                profit_or_loss: profitOrLoss,
                weight: weight,
                user_id: userId
            }

            const createNewCoinInPortfolio = await prisma.portfolio.create({
                data: bodyNewCoinInPortfolio,
            });
            console.log("createNewCoinInPortfolio: --------> ", createNewCoinInPortfolio);
        }

        console.log("createTransaction: --------> ", createTransaction);
        res.status(201).json({ createTransaction });
    }catch (err) {
        next(err);
    }
}


exports.update = async (req, res, next) => {

    try {
        const { value, error } = transactionSchema.validate(req.body);
        if (error) {
            return next(error);
        }
        const Fee = constantFee?.FEE

        //get username from Auth
        const userId = 1

        const fee = calculateFee(Fee, value?.quantity, value?.price)
        let bodyRequest = {
            coin_name: value?.coin_name,
            type: value?.type,
            price: value?.price,
            quantity: value?.quantity,
            fee: fee > 0 ? fee : value?.fee,
            user_id: userId,
            status: constantStatus?.ACTIVE
        }
        const updateTransaction = await prisma.transaction.create({
            data: bodyRequest,
        });

        const checkPortfolioRelationship = await prisma.portfolio.findFirst({
            where: {
                AND: [{coin_name: value?.coin_name},{user_id: userId}]
            }
        })

        if(checkPortfolioRelationship != null){

            const findTransactionByCoinName = await prisma.transaction.findMany({
                where: {
                    AND: [{coin_name: value?.coin_name},{status: constantStatus?.ACTIVE}, {user_id: userId}]
                }
            })

            const totalInvestment = totalInvestments(findTransactionByCoinName)

            // Hrad Code market price 
            const marketPrice = totalMarketPrice(1200, findTransactionByCoinName)
            const profitOrLoss = ((totalInvestment/marketPrice)-1)

            // Calculate weight
            const findTransactionByUserId = await prisma.transaction.findMany({
                where: {
                    AND: [{status: constantStatus?.ACTIVE}, {user_id: userId}]
                }
            })
            const sumInvestmentByUserId = findTransactionByUserId.reduce((sum, data) => {
                const investment = data.price * data.quantity;
                return sum + investment;
            }, 0)
            const averagePurchasePrice = averagePurchasePrices(totalInvestment, findTransactionByCoinName)
            const sumQuantity = sumQuantitys(findTransactionByCoinName)
            const sumInvestmentsByCoinName = findTransactionByCoinName.reduce((sum, data) => {
                const investment = data.price * data.quantity;
                return sum + investment;
            }, 0)
            
            const weight = sumInvestmentsByCoinName/sumInvestmentByUserId

            await prisma.portfolio.update({
                data: {
                    weight: weight,
                    average_purchase_price: averagePurchasePrice,
                    profit_or_loss: profitOrLoss,
                    quantity: sumQuantity,
                },
                where: {
                    portfolio_id: checkPortfolioRelationship.portfolio_id,
                    AND: [
                        { user_id: userId },
                        { coin_name: value.coin_name }
                    ]
                }
            });
            

        }else{
            next(error);
            res.status(404)
            console.log("Error checkPortfolioRelationship: --------> ", checkPortfolioRelationship);
        }



        console.log("updateTransaction: --------> ", updateTransaction);
        res.status(201).json({ updateTransaction });
    }catch (err) {
       next(err);
    }

}

const calculateFee = (fee, quantity, price) => {
    return fee * (quantity * price)
}

const totalInvestments = ( dataFromTransaction ) => {
    const calculateInvestment = dataFromTransaction.reduce((sum, data) => {
        const investment = data.price * data.quantity;
        return sum + investment;
    }, 0)
    return calculateInvestment;
} 

const totalMarketPrice = ( marketPrice, dataFromTransaction) => {
    const calculateMarketPrice = dataFromTransaction.reduce((sum, data) => {
        const sumMarket = marketPrice * data.quantity;
        return sum + sumMarket;
    }, 0)
    return calculateMarketPrice;
}

const averagePurchasePrices = ( totalInvestment, dataFromTransaction ) => {
    const calculateQuantity = dataFromTransaction.reduce((sum, data) => {
        const quantity = data?.quantity;
        return sum + quantity;
    }, 0)
    return (totalInvestment/calculateQuantity)
}

const sumQuantitys = (dataFromTransaction) => {
    const calculateQuantity = dataFromTransaction.reduce((sum, data) => {
        const quantity = data?.quantity;
        return sum + quantity;
    }, 0)
    return calculateQuantity
}