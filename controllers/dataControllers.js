const db = require('./../database')


module.exports = {
    BestSellerByProductName : (req,res) => {
        var sql = `select td.product_name, c.category,count(*) as sold_unit from transaction_detail as td
                    join product as p on td.product_name = p.product_name
                    join category as c on p.category = c.id
                    join transactions as t on td.order_number = t.order_number
                    where t.status = 'Approved'
                    group by td.product_name
                    order by count(*) desc
                    limit 10;`
        db.query(sql, (err, result) => {
            if(err) throw err
            res.send(result)
        })
    },
    BestSellerByCategory : (req,res) => {
        var sql = `select c.category, s.subcategory, count(*) as sold_unit from transaction_detail as td
                    join product as p on td.product_name = p.product_name
                    join category as c on p.category = c.id
                    join subcategory as s on p.subcategory = s.id
                    join transactions as t on td.order_number = t.order_number
                    where t.status = 'Approved'
                    group by category, subcategory
                    order by sold_unit desc;`
        db.query(sql, (err,result) => {
            if(err) throw err
            res.send(result)
        })
    },
    BestBuyer : (req,res) => {
        var sql = `select td.iduser,u.username, count(*) as unit_bought from transaction_detail as td
                    join product as p on td.product_name = p.product_name
                    join transactions as t on td.order_number = t.order_number
                    join users as u on td.iduser = u.id
                    where t.status = 'Approved'
                    group by td.iduser
                    order by count(*) desc;`
        db.query(sql, (err,result) => {
            if(err) throw err
            res.send(result)
        })
    },
    BestSellersForSlick : (req,res) => {
        var sql = `select td.product_name, p.id, p.price,p.discount,p.image from transaction_detail as td
                    join product as p on td.product_name = p.product_name
                    join category as c on p.category = c.id
                    join transactions as t on td.order_number = t.order_number
                    where t.status = 'Approved'
                    group by td.product_name
                    order by count(*) desc
                    limit 6;`
        db.query(sql, (err,result) => {
            if(err) throw err
            res.send(result)
        })
    }
}