const express = require('express')
const app = express()
const Pool = require('pg').Pool;
const router = express.Router();
const pool = require('../db-pool')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken");

router.post(`/register`, (req, res)=> {
    let {username, password} = req.body;
    
    try {
        bcrypt.genSalt(saltRounds, async function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) { 
                
                const newUser = await pool.query(`INSERT INTO users(username, password) VALUES ($1, $2) RETURNING *`, 
                [username, hash]);
                res.send(newUser.rows[0].username)
            })
        })
    }
    catch(err) {
        res.send(err)
    }
})

router.post(`/login`, async (req, res)=> {
    let {username, password} = req.body;
    const io = req.app.get("socketio");

    const loginQuery = {
        name: "select-user",
        text: 'SELECT * FROM users WHERE username = $1',
        values: [username]
    }  

    try {
        const loginResponse1 = await pool.query(loginQuery);
        const hash = loginResponse1.rows[0].password;
        if (hash) {
            bcrypt.compare(password, hash, function(err, result) {
                const loggedInNow = true;
                if(result == true) {
                    const logInBool = pool.query(`UPDATE users SET isloggedin = $2 WHERE username = $1 RETURNING *`, 
                    [username,loggedInNow]);

                    const payload = {
                        id: loginResponse1.rows[0].id,
                        username: loginResponse1.rows[0].username
                    }
                    const token = jwt.sign(payload, process.env.TOKEN_SECRET) 

                    io.emit("loggedInUser", { user: payload } )
                    res.json(["Welcome back!", loginResponse1.rows[0].id, loginResponse1.rows[0].username, token]) 
                 
                } else {
                    res.send(['something went wrong', err])
                }
            });
        
        } else {
            res.send("Something went wrong.  Please try again.")
        }
    } catch(e) {
        res.send(["Something went wrong.  Please try again.", e.stack])
    }
})

router.post(`/logout`, async (req, res)=> {
    let {userid, username} = req.body;
   
    const io = req.app.get("socketio");
    
    try {     
        const logOutBool = await pool.query(`UPDATE users SET isloggedin = $1 WHERE id = $2 RETURNING *`, 
        [false, userid]);

        const logOutPayload = {
            id: logOutBool.rows[0].id,
            username: logOutBool.rows[0].username
        }

        io.emit("loggedOutUser", {user: logOutPayload})
        res.send('See you later!' )
    }
    catch(err) {
        res.send(['something went wrong', err])
    }
})

module.exports = router;