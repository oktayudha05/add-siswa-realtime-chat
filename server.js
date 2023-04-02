const express = require('express')
const mysql = require('mysql')
const BodyParser = require('body-parser');
const bodyParser = require('body-parser');

const app = express()

const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server)

app.use(BodyParser.urlencoded({extended: true}))

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
    
    app.get("/", (req, res) => {
        const sql = "SELECT * FROM user"
        db.query(sql, (err, result) => {
            const users = JSON.parse(JSON.stringify(result))
            res.render("index", {
                users : users, 
                title : 'DATA SISWA'
            })
        }) 
    })

    //! REALTIME CHAT
    app.get("/chat", (req, res) => {
        res.render("chat", {
            title : 'MASUK CHAT',
        })
    })

    app.post("/tambah", (req, res) => {
        const insertSql = `INSERT INTO user (nama, kelas) VALUES ('${req.body.nama}', '${req.body.kelas}')`
        db.query(insertSql, (err, result) => {
            if (err) throw err
            res.redirect("/")
        })
    })

    
})

io.on('connection', (socket) => {
    socket.on('message', (data) => {
        console.log('data =>', data)
        socket.broadcast.emit('message', data)
    })
})

server.listen(8000, () => {
    console.log('server redy...');
})