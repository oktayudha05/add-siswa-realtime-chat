const express = require('express')
const mysql = require('mysql')

const app = express()

app.set("view engine", "ejs")
app.set("views", "views")

const db = mysql.createConnection({
    host : "localhost",
    database : "db_realtimechat",
    user : "root",
    password : "",
})

db.connect((err) => {
    if (err) throw err
    console.log('database connected...')

    const sql = "SELECT * FROM user"
    db.query(sql, (err, result) => {
        const users = JSON.parse(JSON.stringify(result))
        console.log('hasil database ->', users);
        app.get("/", (req, res) => {
            res.render("index", {users : users, title : 'OMYMA14 ROOM CHAT'})
        })
    }) 
})

app.listen(8000, () => {
    console.log('server redy...');
})