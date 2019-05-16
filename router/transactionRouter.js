const router = require('express').Router()
const {getTransactions, getTransactionsByUser, unapprovedTransactionsUser ,
        getTransactionDetail, uploadPayment, approveTransaction
        ,getTransactionsHistory, filterHistory, rejectTransaction} = require('./../controllers').transactionControllers

var multer = require('multer')

const storageConfig = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null, './upload')
    },
    filename: (req,file,cb) => {
        cb(null, 'REC-' + Date.now() + '.' + file.mimetype.split('/')[1])
    }
})

const filterConfig = (req,file,cb) => {
    if(file.mimetype.split('/')[1] === 'png' || file.mimetype.split('/')[1] === 'jpeg'){
        cb(null, true)
    } else {
        cb(new Error('Image must be jpeg / png ') , false)
    }
}

var upload = multer({storage : storageConfig , fileFilter : filterConfig, limits :{fileSize : 2000 * 1024}})


router.get('/getTransactions', getTransactions)
router.get('/transUser/:id', getTransactionsByUser)
router.get('/translist/:id', unapprovedTransactionsUser)
router.get('/transdetail/:id', getTransactionDetail)
router.get('/history/:id', getTransactionsHistory)
router.get('/filterhistory', filterHistory)
router.put('/completePayment/:id', upload.single('receipt'), uploadPayment)
router.put('/approve/:id', approveTransaction)
router.put('/reject/:id', rejectTransaction)


module.exports = router