const express = require('express')
const axios = require('axios')
const app = express()
const path = require('path')

require("dotenv").config();

const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: 5432,
    database: process.env.DATABASE
})

// pool.query('SELECT * FROM messages', (err, res) => {
//     console.log(err, res)
//     pool.end()
//   })

app.use('/', express.static(path.join(__dirname, "client", "build")));

app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

app.listen(process.env.PORT || 3000);

app.get(`/api/users`, async (req, res)=> {
    let {reg} = req.query;
    
    try {
        const usernames = await pool.query('SELECT username FROM users')
        //console.log(usernames.rows)
        res.send(usernames.rows)
  
            } catch(err){
                console.log(err)
            }    
})


app.get(`/api/messages`, async (req, res)=> {
    let {text} = req.query;
    //text="hiiiii";
    //console.log(text)
    try {
        const messages = await pool.query('SELECT text FROM messages')
        //console.log(messages.rows)
        res.send(messages.rows
        )
    }
        catch(err) {
            res.send(err)
            
        }
   
})
app.post(`/api/users`, async (req, res)=> { 
    //console.log(req.body)
    let {username, password} = req.body;
    console.log(username, password)
    try{
        const newUser =  await pool.query(`INSERT INTO users(username, password) VALUES ($1, $2) RETURNING *`, 
            [username, password]);
            console.log('rows :', newUser.rows[0])
            res.send(newUser.rows[0])
    } 
    catch(err){
        console.log(err)
    }
    
})

app.post(`/api/messages`, async (req, res)=> {
    //console.log(req.body)
    let {text} = req.body;
    console.log(text)
    try {
        const newMessage =  await pool.query(`INSERT INTO messages(text) VALUES ($1) RETURNING *`, 
            [text]);
        //console.log(newMessage)
        console.log('message', newMessage)
        console.log('rows :', newMessage.rows[0])
        res.send(newMessage.rows[0])
    } catch(err) {
        console.log(err)
    }  
    
    // res.send('posted!')
})

//this is the line of code needed to get node to route the user to the correct page w/o needing to go back through the home page
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Client', 'build', 'index.html'));
  });

 //re-render just the new messages when user posts a new one, so you can see the new one 
 //create a way to see which user posts which messages based on login.  ?
 //a way to see who is currently logged in
 //socket.io
 //modular design?
 //separate route files?
 //bootstrap / styling

 //user gets a JWT to login
 //if not logged in, they cannot access chat room. Only home page.

 //SQL injection attack and XSS attack and write blog post

 