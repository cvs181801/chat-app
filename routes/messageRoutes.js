const express = require('express')
const pool = require('../db-pool')
const router = express.Router();

router.post(`/messages`, async (req, res)=> {
    const io = req.app.get("socketio");
    let {text, userid} = req.body;
    try {
        const newMessage = await pool.query(`INSERT INTO messages(text,user_id) VALUES ($1, $2) RETURNING *`, 
            [text, userid]);
        const userId = await pool.query('SELECT username FROM users WHERE id = $1',
        [newMessage.rows[0].user_id])    

        const latestMsg = {
                        text: newMessage.rows[0].text, 
                        username: userId.rows[0].username, 
                        userid: newMessage.rows[0].user_id}

        io.emit("newMessage", { msg: latestMsg });
        res.send(latestMsg);
    } catch(err) {
        res.send(['something went wrong', err])
    }  
})

router.get(`/messages`, async (req, res)=> {
    try {
        const messages = await pool.query('SELECT text, username, user_id FROM messages INNER JOIN users ON messages.user_id = users.id')
        res.send(messages.rows)
        console.log((messages.rows))
    }
        catch(err) {
            res.send(['something went wrong', err])  
        }
})

module.exports = router;