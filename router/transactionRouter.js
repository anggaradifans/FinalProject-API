const router = require('express').Router()
const {getTransactions, getTransactionsByUser, unapprovedTransactionsUser ,
        getTransactionDetail, uploadPayment, approveTransaction
        ,getTransactionsHistory, filterHistory, rejectTransaction
        ,annualReport, filterAnnualReport} = require('./../controllers').transactionControllers

const upload = require('../helpers/multerReceipt')

router.get('/getTransactions', getTransactions)
router.get('/transUser/:id', getTransactionsByUser)
router.get('/translist/:id', unapprovedTransactionsUser)
router.get('/transdetail/:id', getTransactionDetail)
router.get('/history/:id', getTransactionsHistory)
router.get('/filterhistory', filterHistory)
router.put('/completePayment/:id', upload.single('receipt'), uploadPayment)
router.put('/approve/:id', approveTransaction)
router.put('/reject/:id', rejectTransaction)
router.get('/annualreport', annualReport)
router.get('/filter-ar', filterAnnualReport)


module.exports = router