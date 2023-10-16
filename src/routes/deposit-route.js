const express = require('express')
const depositController = require('../controllers/deposit-controller')

const router = express.Router()

router.post('/create', depositController.create)

module.exports = router