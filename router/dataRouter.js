const router = require('express').Router()
const {BestSellerByProductName,BestSellerByCategory,BestBuyer, BestSellersForSlick} = require('../controllers').dataControllers

router.get('/bestseller-product', BestSellerByProductName)
router.get('/bestseller-catsub', BestSellerByCategory)
router.get('/bestbuyer', BestBuyer)
router.get('/bestsellers', BestSellersForSlick)

module.exports = router