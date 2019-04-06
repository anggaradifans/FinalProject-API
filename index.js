var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cors = require('cors')

app.use(cors())
app.use(bodyParser.json()); //Parses the text as JSON and exposes the resulting object on req.body

const port = 2000
const { todoRouter, userRouter, productRouter } = require('./router')

app.use('/upload', express.static('upload'))
app.use('/todo', todoRouter)  //bisa tanpa route, tapi lebih dibuat supaya enak dikategorikannya
app.use('/user', userRouter)
app.use('/product', productRouter)

// app.put('/edittodo/:id', (req,res) => {
//     var id = req.params.id
//     var data = req.body
//     var sql =  `update to_do set to_do "${data.todo}" where id = ${id}`
//     db.query(sql ,(err,result) =>{
//         try{
//             if (err) throw err
//             res.send('Edit Sukses')
//         }catch(err){
//             res.send(err)
//         }
       
//     })
// })



app.get('/' , (req,res) => {
    res.send('<h1>Hello World</h1>')
})

app.get('/nama/:id', (req,res) => {
    var nama = req.params.id
    res.send('nama saya ' + nama)

})

app.get('/product/', (req,res) => {
    var nama  = req.query.nama
    res.send('produk ' + nama )
})


app.listen(port, ()=> console.log('aktif di port ' + port))