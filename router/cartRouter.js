const router = require('express').Router()
const {AddToCart, ShowCart, CartCount, DeleteCart} = require('./../controllers').cartControllers

router.post('/addtocart', AddToCart)
router.get('/showcart/:id',ShowCart)
router.get('/cartcount/:id', CartCount)
router.delete('/deletecart/:id', DeleteCart)

module.exports = router