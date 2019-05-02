var db = require('./../database')

module.exports = {
    getTransactions : (req,res) => {
        var sql = `select t.id,tanggal_checkout , u.id as iduser ,u.username, jumlah_item, totalharga, bukti_transaksi, status from transactions as t
        join users as u on iduser = u.id;`
        db.query(sql, (err,result) => {
            if(err) throw err
            res.send(result)
        })
    } 
}