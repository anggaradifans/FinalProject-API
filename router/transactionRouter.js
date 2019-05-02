const router = require('express').Router()
const {getTransactions} = require('./../controllers').transactionControllers

router.get('/getTransactions', getTransactions)

module.exports = router