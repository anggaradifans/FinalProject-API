const router = require('express').Router()
const {addProducts,getProducts, editProducts, deleteProducts} = require('./../controllers').productControllers

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
router.post('/addproduct', upload.single('image') , addProducts)
router.put('/editproduct/:id', upload.single('edit'), editProducts)
router.delete('/deleteproduct/:id', deleteProducts)

module.exports = router