var db = require('./../database')

module.exports = {
    getProducts : (req,res) => {
        var sql = 'select * from product;'
        db.query(sql, (err,result)=> {
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
        
    }
}