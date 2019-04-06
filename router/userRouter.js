const router = require('express').Router()
const {addUser,getAllUser,getUserById,getUserByUsername, deleteUser, editUser, userLogin, keepLogin, verifyUser} = require('./../controllers').userControllers

router.post('/adduser', addUser)
router.get('/allUsers', getAllUser)
router.get('/userById/:id', getUserById)
router.get('/userByUsername', getUserByUsername)
router.delete('/deleteuser/:id' , deleteUser)
router.put('/edituser/:id', editUser)
router.get('/userlogin', userLogin)
router.get('/keeplogin', keepLogin)
router.get('/verifyuser', verifyUser)

module.exports = router