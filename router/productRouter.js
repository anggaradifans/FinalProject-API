const router = require('express').Router()
const {addProducts,getProducts,
        viewManageProducts, 
        editProducts, deleteProducts, 
        productDetail, ps4Videogames, 
        getSearchData, greatDeals, AddToWishList, ViewWishList, WishlistOrNot} = require('./../controllers').productControllers

var multer = require('multer')

const storageConfig = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null, './upload')
    },
    filename: (req,file,cb) => {
        cb(null, 'PRD-' + Date.now() + '.' + file.mimetype.split('/')[1])
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


router.get('/products', getProducts)
router.get('/manageproducts', viewManageProducts)
router.get('/product-detail/:id' , productDetail)
router.get('/ps4videogames', ps4Videogames)
router.get('/getsearchdata', getSearchData)
router.get('/greatdeals', greatDeals)
router.get('/wl', WishlistOrNot)
router.get('/wishlist/:id',ViewWishList)
router.post('/addproduct', upload.single('image') , addProducts)
router.post('/addtowl', AddToWishList )
router.put('/editproduct/:id', upload.single('edit'), editProducts)
router.delete('/deleteproduct/:id', deleteProducts)

module.exports = router