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


//this is the line of code needed to get node to route the user to the correct page w/o needing to go back through the home page
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Client', 'build', 'index.html'));
  });


 //local storage
 //a way to prevent user viewing as a guest (aka not logged in) to not be able to post a message until they are logged in. OR  if not logged in, they cannot access chat room. Only home page.
 // JWT?
 //create a way to see which user posts which messages based on login.  ?
 //a way to see who is currently logged in
 //socket.io
 //do not store pw in DB. set up logic for use with hashing***
 //a foreign key for relation . user_id on msgs table.
 //use react context for storing the logged in users? as well as dark/light mode
 //modular design?
 //bootstrap / styling
 //create a prevention method to prevent users from creating the same username - must be unique
 //upon clicking 'login' , return a user id that will essentially allow the user to log in
//that user id gets saved in local storage to allow user to log in.
//local storage: later
//browser router 'go' will automatically send the user to new page upon login/authentication

 //SQL injection attack and XSS attack and write blog post
 //timing attacks ?

 