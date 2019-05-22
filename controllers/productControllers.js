var db = require('./../database')
var fs = require('fs')

module.exports = {
    //BUAT PRODUCT LIST
    getProducts : (req,res) => {
        var sql = `select product.id, product_name, category, subcategory, price, discount,image from product`
        db.query(sql, (err,result)=> {
            if(err) throw err
            res.send(result)
        })
    },
    //BUAT MANAGE PRODUCT
    viewManageProducts : (req,res) => {
        var sql = `select product.id, product_name, c.id as idcat, s.id as idsub, c.category, s.subcategory, price, discount , deskripsi,image from product
                    join category as c on product.category = c.id
                    join subcategory as s on product.subcategory = s.id`
        db.query(sql, (err,result) =>{
            if(err) throw err
            res.send(result)
        })
    },

    addProducts : (req,res) => {
        try {
            var newData = JSON.parse(req.body.data)
            newData.image = req.file.path
            var sql = `insert into product set ?`
            db.query(sql, newData, (err,result) => {
                if(err) throw err
                res.send('Add Sukses')
            })
        } catch(err){
            res.send(err)
        } 
    },
    editProducts : (req,res) => {
        var id = req.params.id
        if(req.file){
            console.log(req.file)
            var data = JSON.parse(req.body.data)
            data.image = req.file.path
            var sql1 = `update product set ? where id = ${id}`
            db.query(sql1, data, (err,result) =>{
                if(err) throw err
                res.send('Update Data Sukses')
                fs.unlinkSync(req.body.imageBefore) 
            })
        }else{
            var data = req.body
            var sql = `update product set ? where id = ${id}`
            db.query(sql,data,(err,result)=> {
                if(err) throw err
                res.send('Edit Data Sukses')
            })
        }
    }, 
    deleteProducts : (req,res) => {
        var id = req.params.id
        var sql = `select * from product where id = ${id}`
        db.query(sql, (err,result) =>{
            try {
                if(err) throw err
                var path = result[0].image
                var sql2 = `delete from product where id = ${id}`
                    db.query(sql2, (err,result1) =>{
                        if(err) throw err
                        res.send('Delete Data Sukses')
                        fs.unlinkSync(path)
                    })
            }
            catch{
                console.log(err)
            }
        })
    },
    
    productDetail : (req,res) => {
        var id = req.params.id
        var sql = `select product.id, product_name, price, discount ,image, deskripsi from product where id = ${id}`
            db.query(sql, (err,result) => {
                if(err) throw err
                res.send(result)
            })
    },
    getSearchData : (req,res) => {
        var name = req.query.product_name
        var name1 = name.replace(/%20/g, " ")
        var sql = `select * from product where product_name = '${name1}'`
            db.query(sql, (err,result)=> {
                if(err) throw err
                res.send(result)
            })
    },
    greatDeals : (req,res) => {
        var sql = `select * from product where discount >= 30;`
            db.query(sql, (err,result) => {
                if(err) throw err
                res.send(result)
            })
    },

    WishlistOrNot : (req,res) => {
        var sql = `select * from wishlist where iduser = ${req.query.iduser} and idproduk = ${req.query.idproduk}`
        db.query(sql, (err,result) => {
            if(err) throw err
            res.send(result)
        })
    },
    AddToWishList : (req,res) => {
        var sql = `select * from wishlist where iduser = ${req.body.iduser} and idproduk = ${req.body.idproduk}`
            db.query(sql, (err,result) => {
                if(err) throw err
                if(result.length > 0){
                    var sql1= `delete from wishlist where iduser = ${req.body.iduser} and idproduk = ${req.body.idproduk}`
                        db.query(sql1, (err, result1) => {
                            if(err) throw err
                            res.send('Item Deleted form Wishlist')
                        })
                } else {
                    var sql2= `insert into wishlist set ?`
                        db.query(sql2, req.body, (err, result2) => {
                            if(err) throw err
                            res.send('Item Added to Wishlist')
                        })
                }
            })
    },
    ViewWishList : (req,res) => {
        var sql = `select w.id, idproduk, p.product_name as namaProduk, p.image, p.price, p.discount from wishlist as w
                    join product as p on w.idproduk = p.id where iduser = ${req.params.id};`
            db.query(sql, (err,result) => {
                if(err) throw err
                res.send(result)
            })
    }
}