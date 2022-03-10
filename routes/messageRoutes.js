const express = require('express')
const pool = require('../db-pool')
const router = express.Router();

router.post(`/messages`, async (req, res)=> {
    const io = req.app.get("socketio");
    console.log(req.body)
    let {text, userid} = req.body;
    try {
        const newMessage = await pool.query(`INSERT INTO messages(text,user_id) VALUES ($1, $2) RETURNING *`, 
            [text, userid]);
        const userId = await pool.query('SELECT username FROM users WHERE id = $1',
        [newMessage.rows[0].user_id])    

        console.log('message rows! :', newMessage.rows)
        console.log('userIds!! :', userId.rows)
        // emit message from server back to the client, this needs to be an object.
        const latestMsg = {
                        text: newMessage.rows[0].text, 
                        username: userId.rows[0].username, 
                        userid: newMessage.rows[0].user_id}

        io.emit("newMessage", { msg: latestMsg });
        res.send(latestMsg);
    } catch(err) {
        console.log(err)
    }  
})

router.get(`/messages`, async (req, res)=> {
    try {
        const messages = await pool.query('SELECT text, username, user_id FROM messages INNER JOIN users ON messages.user_id = users.id')
        console.log("here are all the msgs: ", messages.rows)
        res.send(messages.rows)
    }
        catch(err) {
            res.send(err)  
        }
})

module.exports = router;