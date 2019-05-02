const nodemailer = require('nodemailer')
let transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : "anggaradifans@gmail.com",
        pass : 'dhxliyqmlzxusxoy'
    },
    tls :{
        rejectUnauthorized : false
    }
})
module.exports = transporter