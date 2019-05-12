var db = require('./../database')
var transporter = require('./../helpers/nodemailer')

module.exports = {
    //AS ADMIN
    getTransactions : (req,res) => {
        var sql = `select t.id, tanggal_bayar, u.username, u.email, totalharga, bukti_transaksi, status, order_number from transactions as t
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
    rejectTransaction : (req,res) => {
        var sql = `update transactions set status = '${req.body.status}' where id = ${req.params.id}`
            db.query(sql, (err,result) => {
                if(err) throw err
                var Mailoptions = {
                    from : 'WalaoehGames.com',
                    to : req.body.email,
                    subject : `Invoice ${req.body.no} || Status : Rejected`,
                    html : `<h3> Dear ${req.body.username}, </h3>
                    
                    <p>It seems that your transaction has been rejected by our Admin. In order to complete your transaction again, please visit your transactions page in <a href="http://localhost:3000/payment/${req.body.no}">here</a> </p>`
                }
                transporter.sendMail(Mailoptions, (err,resultMail) => {
                    if(err) throw err
                    res.send('Transaction Rejected')
                })
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
    },
    filterHistory : (req,res) => {
        var sql = `select * from transactions where iduser = ${req.query.iduser} and status = 'Approved' and tanggal_checkout like '%-${req.query.month}-%';`
            db.query(sql, (err,result) => {
                if(err) throw err
                res.send(result)
            })
    }
}