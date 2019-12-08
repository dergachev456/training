const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors');
const app = express();
const urlencodedParser = bodyParser.urlencoded({
    extended: false
});


var whitelist = ['http://localhost:3000', 'http://localhost:5000'];
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions));

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     database: "shop",
//     password: ""
// });

const pool = mysql.createPool({
    connectionLimit: 5,
    host: "localhost",
    user: "root",
    database: "shop",
    password: ""
});

// db.connect((err) => {
//     if (err) {
//         throw err;
//     }
//     console.log('connected');
// });



app.get('/promo', (req, res) => {
    let sql = 'SELECT * FROM promocode';
    let query = pool.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(JSON.stringify(result));
    })
})

app.get('/product', (req, res) => {
    let sql = 'SELECT * FROM product';
    let query = pool.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(JSON.stringify(result));
    })
})

app.get('/product/:id', (req, res) => {
    let sql = 'Select p.id, p.path, p.name, p.price, p.category, p.availability, b.name, m.name as model_name, bo.date, pr.value, pr.discount FROM product p, brand b, model m, booking bo, promocode pr WHERE p.brand_id = b.id AND p.model_id = m.id AND p.booking_id = bo.id AND p.promocode_id = pr.id AND p.id = ?';
    const id = req.params.id;
    let query = pool.query(sql, [id], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(JSON.stringify(result));
    })
})



app.listen(8080, function () {
    console.log("connected");
});