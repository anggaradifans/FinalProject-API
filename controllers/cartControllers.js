var db = require('./../database')
const fs = require('fs')
const hbrs = require('handlebars')
const pdf = require('html-pdf')
const transporter = require('./../helpers/nodemailer')

module.exports = {
    ShowCart : (req,res) => {
        var sql =   `select cart.id, p.product_name as namaProduk, p.price, p.discount, c.category, s.subcategory, quantity from cart
                    join users as u on cart.userid = u.id 
                    join product as p on cart.productid = p.id
                    join category as c on p.category = c.id
                    join subcategory as s on p.subcategory = s.id
                    where cart.userid = ${req.params.id};`
            db.query(sql, (err,result) => {
                if(err) throw err
                res.send(result)
            })
    },
    AddToCart : (req,res) => {
        var sql = `select * from cart where userid = ${req.body.userId} and productid = ${req.body.productId};`
            db.query(sql, (err,result) =>{
                if(result.length > 0){
                    var sql2 = `update cart set quantity = quantity + ${req.body.quantity} where userid = ${req.body.userId} and productid = ${req.body.productId};`
                        db.query(sql2, (err,result1) =>{
                            if(err) throw err
                            res.send('Add Product Success')
                        })
                }
                else {
                    var sql1 = `insert into cart set ?`
                        db.query(sql1, req.body, (err,result2) =>{
                            if(err) throw err
                            res.send('Add Product Success')
                        })
                }
            })
    },
    CartCount : (req,res) => {
        var sql = `select cart.id, u.username, productid,quantity from cart
        join users as u on userid = u.id
        where u.username = '${req.params.id}';`
        db.query(sql, (err,result) => {
            if(err) throw err
            res.send(result)
        })
    },
    DeleteCart : (req,res) => {
        var sql = `delete from cart where id = ${req.params.id}`
            db.query(sql, (err,result) =>{
                if(err) throw err
                res.send('Delete Cart Sukses')
            })
    }, 
    UpdateQty : (req,res) => {
        var sql = `update cart set quantity = ${req.body.quantity} where id = ${req.params.id}`
            db.query(sql, (err,result) =>{
                if(err) throw err
                res.send('Edit Quantity Cart Success')
            })
    },
    CheckOut : (req,res) => {
        var newData = {
            order_number : req.body.order_number,
            tanggal_checkout : req.body.tanggal_checkout,
            iduser : req.body.userId,
            totalharga : req.body.totalHarga,
            jumlah_item : req.body.jumlah_item,
            status : req.body.status
         }
        var sql = `insert into transactions set ?`
            db.query(sql, newData, (err,result) => {
                if(err) throw err
                fs.readFile('./template/invoice.html' , {encoding : 'utf-8'}, (err,hasilRead) => {
                    if(err) throw err
                    var template = hbrs.compile(hasilRead)
                    var data = {
                        no : req.body.order_number,
                        nama : req.body.username,
                        tanggal : newData.tanggal_checkout,
                        total : newData.totalharga
                    }
                    var hasilHbrs = template(data)
                    var options = {
                        format : 'A4',
                        orientation : 'portrait',
                        border : {
                            top: "0,5in",
                            left : "0,5in",
                            right : "0,5in",
                            bottom : "0,5in"
                        }
                    }
                    pdf.create(hasilHbrs, options).toStream((err,hasilStream) => {
                        if(err) throw err
                        var Mailoptions = {
                            from : 'WalaoehGames.com',
                            to : req.body.email,
                            subject : 'Invoice untuk ' + data.nama,
                            html : `<h3> Dear ${data.nama}, </h3>
                            
                            <p>Thank you for purchasing our products! In order to complete your transaction, please upload your receipt in <a href="http://localhost:3000/verifytrans?order=${data.no}">here</a> </p>`,
                            attachments : [
                                {
                                    filename : 'invoice.pdf',
                                    content : hasilStream
                                }
                            ]
                        }
                        transporter.sendMail(Mailoptions, (err,resultMail) => {
                            if(err) throw err
                            res.send('Check your Email for Invoice')
                        })
                    })
                })
            })
    },
    AddToTransactionDetail : (req,res) => {
        var sql = `insert into transaction_detail set ?`
            db.query(sql, req.body, (err, result) => {
                if(err) throw err
                res.send('Add to Detail Sukses')
            })
    }
}