const express = require('express')
const app = express()
//const pool = require('pg').Pool;
const pool = require('../db-pool')

//const { Pool } = require('pg')
//const pool = new Pool()
const router = express.Router();

router.post(`/messages`, async (req, res)=> {
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
  
})

router.get(`/messages`, async (req, res)=> {
    try {
        const messages = await pool.query('SELECT text FROM messages')
        console.log(messages.rows)
        res.send(messages.rows)
    }
        catch(err) {
            res.send(err)
            
        }
})

module.exports = router;