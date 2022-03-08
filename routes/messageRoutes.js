const express = require('express')
//const pool = require('pg').Pool;
const pool = require('../db-pool')

//const { Pool } = require('pg')
//const pool = new Pool()
const router = express.Router();

router.post(`/messages`, async (req, res)=> {
    const io = req.app.get("socketio");
    console.log(req.body)
    let {text, userid} = req.body;
   // console.log(text)
    try {
        const newMessage = await pool.query(`INSERT INTO messages(text,user_id) VALUES ($1, $2) RETURNING *`, 
            [text, userid]);
        //console.log('message', newMessage)
        console.log('rows :', newMessage.rows[0])
        // emit message from server back to the client, this needs to be an object.
        io.emit("newMessage", { msg: newMessage.rows[0] });
        res.send(newMessage.rows[0]);
    } catch(err) {
        console.log(err)
    }  
})

router.get(`/messages`, async (req, res)=> {
    try {
        const messages = await pool.query('SELECT text, username, user_id FROM messages INNER JOIN users ON messages.user_id = users.id')
        console.log(messages.rows)
        res.send(messages.rows)
    }
        catch(err) {
            res.send(err)
            
        }
})

module.exports = router;