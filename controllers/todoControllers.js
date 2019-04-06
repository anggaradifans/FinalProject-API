var db = require('./../database')

module.exports = {
    addTodo : (req,res) => {
        //REQ.BODY BUAT AMBIL DATA DARI FRONT END
        console.log(req.body)
        var user = req.body.user
        var todo = req.body.todo
        var sql = `insert into to_do (id_user, to_do) values (${user},'${todo}');`
        db.query(sql, (err, result) =>{
            if(err) throw err
            var sql2 = `select to_do.id,  username, to_do from to_do
            join users on id_user = users.id;`
            db.query(sql2, (err,result1) => {
                if (err) throw err
                res.send(result1)
            })
        })
       
    },
    editToDoById : (req,res) => {
        var id = req.params.id
        var data = req.body
        var sql =  `update to_do set to_do = ? where id = ${id};`
        db.query(sql , data.todo ,(err,result) =>{
            try{
                if (err) throw err
                var sql2 = `select to_do.id,  username, to_do from to_do
                            join users on id_user = users.id;`
                db.query(sql2, (err,result1) => {
                    if (err) throw err
                    res.send(result1)
            })
            } catch {
                    res.send(err)
            }
                
           
        })
    },
    deleteToDo :  (req,res) => {
        var id = req.params.id
        var sql = `delete from to_do where id =${id}`
        db.query(sql, (err,result) =>{
            if (err) throw err
                var sql2 = `select to_do.id,  username, to_do from to_do
                            join users on id_user = users.id;`
                db.query(sql2, (err,result1) => {
                    if (err) throw err
                    res.send(result1)
            })
        })
    },
    getUserTodo :  (req,res) => {
        var sql = `select to_do.id,  username, to_do from to_do
        join users on id_user = users.id;`
        db.query(sql, (err,result) =>{
            if(err) throw err
            res.send(result)
        })
    }
}