const express = require('express')
const axios = require('axios')
const app = express()
const path = require('path')
const pool = require('./db-pool.js')
const http = require("http");
const socket = require("socket.io");
const server = http.createServer(app);
const io = socket(server);

require("dotenv").config(); 

app.use(express.json())

app.set("socketio", io);

app.use('/', express.static(path.join(__dirname, "client", "build")));
app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/userRoutes"));
app.use("/api", require("./routes/messageRoutes"));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

io.on('connection', (socket) => {
    console.log('a user connected: socket id', socket.id);
});

server.listen(process.env.PORT || 3000);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
  });



 

 