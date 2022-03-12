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

//this is the line of code needed to get node to route the user to the correct page w/o needing to go back through the home page!
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Client', 'build', 'index.html'));
  });


//fix web socket for active users on chat page
// JWT usage? The server can send a cookie or a refresh token instead of sending the jwt to the client. 

//--local storage and cookies are similar - they are both ways to store info locally
//--from node server to brower res.cookie() express middleware . then after user logs in, anytime they wanna post a msg etc there needs to be a way for the browser to send the cookie to server using req object to again verify this person is the person they say they are.
//'like' system?
 //modular design?
 //SQL injection attack and XSS attack and write blog post.  goal of hacker: to bypass authentication and access msgs. could even use postman
 //timing attacks ?

 // a6b94856-3234-4049-b8e8-6598d2303beb CasS hello123
 // fa576daf-a343-484b-a16b-25f4ad520522 Spongebob1 hoopla
 //2c30765c-0ee0-4c9e-b38e-9f54636b4eb7 happyhacker1 tohackornottohack

 //small change!

 