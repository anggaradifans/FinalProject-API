var db = require('./../database')

module.exports = {
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

    addCategory : (req,res) => {
        var sql = `insert into category set ?`
        db.query(sql, req.body, (err,result) => {
            if(err) throw err
            res.send("Add Category Sukses")
        })
    },
    addSubcategory : (req,res) => {
        var sql = `insert into subcategory set ?`
        db.query(sql, req.body, (err,result) =>{
            if(err) throw err
            res.send("Add Subcategory Sukses")
        })
    },
    editCategory : (req,res) => {
        id = req.params.id
        var sql = `update category set ? where id = ${id}`
            db.query(sql, req.body, (err,result) =>{
                if(err) throw err
                res.send('Edit Category Sukses')
            })
    },
    editSub : (req,res) => {
        id = req.params.id
        var sql = `update subcategory set ? where id = ${id}`
            db.query(sql, req.body, (err,result) => {
                if(err) throw err
                res.send('Edit Subcategory Sukses')
            })
    },
    deleteCat : (req,res) => {
        id = req.params.id
        var sql = `delete from category where id = ${id}`
            db.query(sql, (err,result) =>{
                if(err) throw err
                res.send('Delete Category Sukses')
            })
    },
    deleteSub : (req,res) => {
        id = req.params.id
        var sql = `delete from subcategory where id = ${id}`
            db.query(sql, (err,result) => {
                if(err) throw err
                res.send('Delete Subcategory Sukses')
            })
    }
}