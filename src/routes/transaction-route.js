const express = require('express')
const transactionController = require('../controllers/transaction-controller')

const router = express.Router()

router.post('/create', transactionController.create)
router.patch('/update', transactionController.update)

module.exports = router