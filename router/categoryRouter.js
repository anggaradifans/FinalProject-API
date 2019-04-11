const router = require('express').Router()
const   {getCategory, getSubcategory, 
        addCategory, addSubcategory,
        editCategory, editSub,
        deleteCat,deleteSub} = require('./../controllers').categoryControllers

router.get('/category', getCategory)
router.get('/subcategory', getSubcategory)
router.post('/addcategory', addCategory)
router.post('/addsubcat', addSubcategory)
router.put('/editcat/:id', editCategory)
router.put('/editsub/:id', editSub)
router.delete('/deletecat/:id', deleteCat)
router.delete('/deletesub/:id', deleteSub)

module.exports = router