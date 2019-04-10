var db = require('./../database')
var fs = require('fs')

module.exports = {
    getProducts : (req,res) => {
        var sql = `select product.id, product_name, c.category, s.subcategory, price, discount, deskripsi ,image from product
        join category as c on product.category = c.id
        join subcategory as s on product.subcategory = s.id;`
        db.query(sql, (err,result)=> {
            if(err) throw err
            res.send(result)
        })
    },
    getCategory : (req,res) => {
        var sql = `select * from category`
        db.query(sql, (err,result) => {
            if(err) throw err
            res.send(result)
        })
    },
    getSubcategory : (req,res) => {
        var sql = `select * from subcategory`
        db.query(sql, (err,result) => {
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
        var sql = `select * from product where id = ${id}`
            db.query(sql, (err,result) => {
                if(err) throw err
                res.send(result)
            })
    },
    ps4Videogames : (req,res) => {
        var sql = `select * from product where category = 'Videogames' and subcategory = 'PS4';`
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
    }
}