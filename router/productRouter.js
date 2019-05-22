const router = require('express').Router()
const {addProducts,getProducts,
        viewManageProducts, 
        editProducts, deleteProducts, 
        productDetail,
        getSearchData, greatDeals, AddToWishList, ViewWishList, WishlistOrNot} = require('./../controllers').productControllers

const upload = require('./../helpers/multer')

router.get('/products', getProducts)
router.get('/manageproducts', viewManageProducts)
router.get('/product-detail/:id' , productDetail)
router.get('/getsearchdata', getSearchData)
router.get('/greatdeals', greatDeals)
router.get('/wl', WishlistOrNot)
router.get('/wishlist/:id',ViewWishList)
router.post('/addproduct', upload.single('image') , addProducts)
router.post('/addtowl', AddToWishList )
router.put('/editproduct/:id', upload.single('edit'), editProducts)
router.delete('/deleteproduct/:id', deleteProducts)

module.exports = router