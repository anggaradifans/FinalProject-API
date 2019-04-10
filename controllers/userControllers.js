var db = require('./../database')
const nodemailer = require('nodemailer')
const Crypto = require('crypto')

let transporter = nodemailer.createTransport({
    service : 'gmail',
    auth :{
        user : "anggaradifans@gmail.com",
        pass : 'dhxliyqmlzxusxoy'
    },
    tls : {
        rejectUnauthorized : false
    }
})


module.exports = {
    getAllUser : (req,res) => {
        var sql = 'select * from users;'
        db.query(sql, (err,result)=> {
            res.send(result)
        })
    },
    getUserByUsername : (req,res) => {
        var username = req.query.username
        var sql = `select * from users where username = ${username}`
        db.query(sql, (err,result) => {
            res.send(result)
        })
    },
    getUserById : (req,res) => {
        var id = req.params.id
        var sql = `select * from users where id =${id};`
        db.query(sql, (err,result) => {
            res.send(result[0])
        })
    },
    addUser : (req,res) =>{
        var nama = req.body.username
        var email = req.body.email
        var sql = `select * from users where username = "${nama}"` 
        db.query(sql, (err,result) =>{
            try{
                if (err) throw err
                if(result.length > 0) throw {error : true, msg : 'Username sudah ada'}
                    var data = req.body
                    var hashPassword = Crypto.createHmac('sha256','secretabc').update(data.password).digest("hex")
                    data ={...data, password : hashPassword}
                    var mailOptions = {
                        from : 'Jual2Game.com',
                        to : email ,
                        subject : 'Verifikasi Akun - Jual2Game.com',
                        html : `<h2>Klik <a href="http://localhost:3000/verify?username=${nama}&password=${hashPassword}">Link</a> ini untuk mengaktifkan akun Anda</h2>`
                    }
                    transporter.sendMail(mailOptions, (err,res3) => {
                        res.send('Email Berhasil dikirim')
                    })
                    var sql2 = `insert into users set ?` //? akan ke replaced dengan data
                    db.query(sql2, data, (err,result1) => {
                        if (err) throw err
                        res.send('Add User Sukses')
                    })
                
                
            } catch(err){
                res.send(err)
            }
        })
    }, deleteUser :  (req,res) => {
        var id = req.params.id
        var sql = `delete from users where id =${id};`
        db.query(sql, (err,result) =>{
            if(err) throw err
            res.send('Delete Sukses')
        })
    }, editUser :  (req,res) => {
        var id = req.params.id
        var data = req.body
        var sql =  `update users set ? where id = ${id}`
        db.query(sql,data, (err,result) =>{
            res.send('Edit Sukses')
        })
    }, userLogin : (req,res) => {
        var username = req.query.username
        var password = req.query.password
        var hashPassword = Crypto.createHmac('sha256','secretabc').update(password).digest('hex')
        var sql = `select * from users where username = "${username}" and password = "${hashPassword}";`
        db.query(sql, (err,result) => {
                if(err) throw err
                res.send(result)
        })
    },
    keepLogin : (req,res) => {
        var username = req.query.username
        var sql = `select * from users where username = '${username}';`
        db.query(sql, (err,result) => {
            try{
                if(err) throw err
                res.send(result)
            }
            catch(err) {
                res.send(err)
            }
           
        })
    },

    verifyUser : (req,res) => {
        username = req.body.username
        password = req.body.password
        var sql = `update users set verified = 1 where username = '${username}' and password = '${password}'`
        db.query(sql, (err,result) => {
            if(err) throw err
            res.send('Email Anda Sudah terverifikasi, selamat berbelanja')
        })
        
    }
}