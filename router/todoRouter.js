const router = require('express').Router()
const { addTodo,editToDoById,deleteToDo,getUserTodo } = require('./../controllers').todoControllers

router.post('/addtodo' , addTodo)
router.delete('/deletetodo/:id', deleteToDo)
router.put('/edittodo/:id', editToDoById)
router.get('/getusertodo' , getUserTodo)

module.exports = router