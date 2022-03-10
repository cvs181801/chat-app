const express = require('express')
const app = express()
const router = express.Router();
const pool = require('../db-pool')

router.get(`/users`, async (req, res)=> {
   // const io = req.app.get("socketio");
    try {
        const usernames = await pool.query('SELECT id, username FROM users WHERE isloggedin = true') 
        console.log(usernames.rows)
        // emit message from server back to the client, this needs to be an object.
        console.log("logged in users!! :", usernames.rows)
        //io.emit("loggedInUser", {user: usernames.rows} )
        res.send(usernames.rows)
        } 
    catch(err) {
        console.log(err)
        }    
})

router.post(`/users`, async (req, res)=> { 
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

module.exports = router;