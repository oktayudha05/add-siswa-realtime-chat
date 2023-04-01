const express = require('express')
const mysql = require('mysql')

const app = express()

const db = mysql.createConnection({
    host : "localhost",
    database : "db_realtimechat",
    user : "root",
    password : "",
})

db.connect((err) => {
    if (err) throw err
    console.log('database connected...');
    app.get("/", (req, res) => {
        res.send('ROUTE OPEN')
    })
})

app.listen(8000, () => {
    console.log('server redy...');
})