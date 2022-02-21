const express = require('express')
const axios = require('axios')
const app = express()
const path = require('path')

require("dotenv").config();

//console.log(process.env)

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
    console.log(reg)
    try {
        const usernames = await pool.query('SELECT username FROM users')
        console.log(usernames.rows)
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
    console.log(req.body)
    let {username, password} = req.body;
    console.log(username, password)
    res.send([username, password]);
})


app.get(`/api/messages`, async (req, res)=> {
    let {text} = req.query;
    //text="hiiiii";
    console.log(text)
    try {
        const messages = await pool.query('SELECT text FROM messages')
        console.log(messages.rows)
        res.send(messages.rows
            // [
            //        {
            //             chat_id: 4,
            //             user_id: 3,
            //             text: "hey, what's upall.",
            //             lang: 'EN'
            //         },
            //         {
            //             chat_id: 5,
            //             user_id: 3,
            //             text: "I want tacos!",
            //             lang: 'EN'
            //         },
            //         {
            //             chat_id: 6,
            //             user_id: 2,
            //             text: "??",
            //             lang: 'EN'
            //         },
            //         {
                       
            //             chat_id: 10,
            //             user_id: 2,
            //             text: `${text}`,
            //             lang: 'EN'
            //         }
            // ]
        )
    }
        catch(err) {
            res.send(err)
            
        }
   
})

app.post(`/api/messages`, async (req, res)=> {
    console.log(req.body)
    let {text} = req.body;
    console.log(text)
    try {
        const newMessage = await pool.query(`INSERT INTO messages(text, user_id, created_at) VALUES (${text}, 2, February 21 2022)`);
        res.send(`hi post req!`)
    } catch(err) {
        console.log(err)
    }  
})

// router.post("/messages", async (req, res) => {
//     const { id, text, userName } = req.body;
//     const date = new Date();
//     const io = req.app.get("socketio");
  
//     try {
//       const newMessage = await pool.query(
//         "INSERT INTO messages(messages_text, created_date, user_id) VALUES($1, $2, $3) RETURNING *",
//         [text, date, id]
//       );
  
//       // add firstname to object below coming from req.body
//       io.emit("receive-message", { firstname: userName, messages_text: text });
  
//       res.json(newMessage.rows[0]);
//     } catch (err) {
//       res.status(500).send(err.message);
//     }
//   });