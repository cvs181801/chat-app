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
    console.log('a user connected');
});

server.listen(process.env.PORT || 3000);

//server.listen(process.env.HOST);

//this is the line of code needed to get node to route the user to the correct page w/o needing to go back through the home page!
app.get('/*', (req, res) => {
    //res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
  });

//fix web sockets issues causing users to show incorrectly.  it works fine the first time but when someone logs out the broadcast starts going haywire
//program 'enter key
// cookies
//make the text input field bigger esp on mobile
//modular design?
//SQL injection attack and XSS attack and write blog post
//timing attacks ?
//hacking websockets
//like system? 
//Add “{user} is typing” functionality.


 

 