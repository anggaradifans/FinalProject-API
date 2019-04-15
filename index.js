var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cors = require('cors')

app.use(cors())
app.use(bodyParser.json()); //Parses the text as JSON and exposes the resulting object on req.body

const port = 2000
const {userRouter, productRouter, categoryRouter, cartRouter} = require('./router')

app.use('/upload', express.static('upload'))
app.use('/user', userRouter)
app.use('/product', productRouter)
app.use('/category', categoryRouter)
app.use('/cart', cartRouter)

app.listen(port, ()=> console.log('aktif di port ' + port))