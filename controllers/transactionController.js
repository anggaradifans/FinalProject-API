var db = require('./../database')

module.exports = {
    //AS ADMIN
    getTransactions : (req,res) => {
        var sql = `select t.id, tanggal_bayar, u.username, totalharga, bukti_transaksi, status, order_number from transactions as t
        join users as u on iduser = u.id where status NOT LIKE 'Approved';`
        db.query(sql, (err,result) => {
            if(err) throw err
            res.send(result)
        })
    },
    approveTransaction : (req,res) => {
        var sql = `update transactions set status = '${req.body.status}' where id = ${req.params.id}`
            db.query(sql, (err, result) => {
                if(err) throw err
                res.send('Transaction has been Approved')
            })
    }, 
    //AS USER
    getTransactionsByUser : (req,res) => {
        var sql = `select * from transactions
        where order_number = '${req.params.id}';`
        db.query(sql, (err,result) => {
            if(err) throw err
            res.send(result)
        })
    },
    getTransactionDetail : (req,res) => {
        var sql = `select product_name, quantity, price from transaction_detail where order_number = '${req.params.id}';`
        db.query(sql, (err,result) => {
            if(err) throw err
            res.send(result)
        })
    },
    uploadPayment : (req,res) => {
        var newData = JSON.parse(req.body.data)
        newData.bukti_transaksi = req.file.path
        var sql = `update transactions set ? where order_number = '${req.params.id}'`
            db.query(sql, newData, (err,result) => {
                if(err) throw err
                var sql2 = `update transaction_detail set tanggal_pembayaran = '${newData.tanggal_bayar}' 
                            where order_number = '${req.params.id}'`
                    db.query(sql2, (err, result1) => {
                        if(err) throw err
                        res.send('Upload Receipt Successful, Thank You For Shopping')
                    })
            })
    },
    getTransactionsHistory : (req,res) => {
        var sql = `select tanggal_checkout, tanggal_bayar, jumlah_item, totalharga, order_number from transactions 
                    where iduser = ${req.params.id} and status = 'Approved';`
            db.query(sql, (err,result) => {
                if(err) throw err
                res.send(result)
            })
    }
}