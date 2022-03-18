const express = require('express')
const app = express()
const Pool = require('pg').Pool;
const router = express.Router();
const pool = require('../db-pool')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken");

router.post(`/register`, (req, res)=> {
    console.log(req.body)
    let {username, password} = req.body;
    
    try {
        bcrypt.genSalt(saltRounds, async function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) { //adding async returns a promise! 
                
                const newUser = await pool.query(`INSERT INTO users(username, password) VALUES ($1, $2) RETURNING *`, 
                [username, hash]);
                console.log('user rows', newUser.rows[0].username)
                res.send(newUser.rows[0].username)
            })
        })
    }
    catch(err) {
        console.log(err)
        res.send(err)
    }
})

router.post(`/login`, async (req, res)=> {
    console.log(req.body)
    let {username, password} = req.body;
    //console.log(req.body)
    const io = req.app.get("socketio");
    //console.log(io)

    const loginQuery = {
        name: "select-user",
        text: 'SELECT * FROM users WHERE username = $1',
        values: [username]
    }  

    try {
        const loginResponse1 = await pool.query(loginQuery);
        console.log(loginResponse1.rows[0])
        const hash = loginResponse1.rows[0].password;
        if (hash) {
            bcrypt.compare(password, hash, function(err, result) {
                const loggedInNow = true;
                if(result == true) {
                    const logInBool = pool.query(`UPDATE users SET isloggedin = $2 WHERE username = $1 RETURNING *`, 
                    [username,loggedInNow]);
                    console.log("Login - user :", loginResponse1.rows[0])

                    const payload = {
                        id: loginResponse1.rows[0].id,
                        username: loginResponse1.rows[0].username
                    }
                    console.log("login payload :", payload)
                    const token = jwt.sign(payload, process.env.TOKEN_SECRET) 
                    // emit message from server back to the client, this needs to be an object.
                    io.emit("loggedInUser", { user: payload } )
                    res.json(["Welcome back!", loginResponse1.rows[0].id, loginResponse1.rows[0].username, token]) 
                 
                } else {
                    console.log(err)
                }
            });
        
        } else {
            console.log("Something went wrong.  Please try again.")
            res.send("Something went wrong.  Please try again.")
        }
    } catch(e) {
        console.error(e.stack)
        res.send(["Something went wrong.  Please try again.", e.stack])
    }
})

router.post(`/logout`, async (req, res)=> {
    console.log(req.body)
    let {userid, username} = req.body;
    console.log(userid, username)
    //console.log(req.body)
    const io = req.app.get("socketio");
    
    try {     
        const logOutBool = await pool.query(`UPDATE users SET isloggedin = $1 WHERE id = $2 RETURNING *`, 
        [false, userid]);
        console.log('logout - user', logOutBool.rows[0])
        const logOutPayload = {
            id: logOutBool.rows[0].id,
            username: logOutBool.rows[0].username
        }
        // emit message from server back to the client, this needs to be an object. send the minimim amt of info needed.
        

        io.on("connection", (socket) => {
            socket.broadcast.emit("loggedOutUser", {user: logOutPayload} )
          });


        res.send('See you later!' )
    }
    catch(err) {
        console.log(err)
    }
})

module.exports = router;