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
                    // [
                    //     {
                    //         "id": 1,
                    //         "screenname": "frogman",
                    //         "username": "green123",
                    //         "password": "hatsoff"
                    //     },
                    //     {
                    //         "id": 2,
                    //         "screenname": "crazycodegurl",
                    //         "username": "SammieGurl",
                    //         "password": "hacktheplanet24" 
                    //     },
                    //     {
                    //         "id": 3,
                    //         "screenname": "veganhippie",
                    //         "username": "TacoTownLover",
                    //         "password": "tacos_forever"    
                    //     }
                    //     // ,
                    //     // {
                    //     //     "id": 4,
                    //     //     "screenname": `${reg}`,
                    //     //     "username": "notausername",
                    //     //     "password": "notapassword" 
                    //     // }
                    // ]
                
            } catch(err){
                console.log(err)
            }    
})

app.post(`/api/users`, function(req, res) { 
    //console.log(req.body)
    let {username, password} = req.body;
    //console.log(username, password)
    res.send([username, password]);
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

  ///ALTER TABLE tableA ALTER COLUMN colA SET DATA TYPE UUID USING (uuid_generate_v4());