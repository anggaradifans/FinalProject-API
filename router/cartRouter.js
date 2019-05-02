const router = require('express').Router()
const {AddToCart, ShowCart, CartCount, DeleteCart, UpdateQty, CheckOut, AddToTransactionDetail} = require('./../controllers').cartControllers

router.post('/addtocart', AddToCart)
router.get('/showcart/:id',ShowCart)
router.get('/cartcount/:id', CartCount)
router.delete('/deletecart/:id', DeleteCart)
router.put('/editcart/:id', UpdateQty)
router.post('/checkout', CheckOut)
router.post('/addtransdetail', AddToTransactionDetail)

module.exports = router