var db = require('./../database')

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
    }
}