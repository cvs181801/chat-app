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
                //console.log('hash :', hash)
                ////console.log('salt :', salt)
                
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
                    console.log(loginResponse1.rows[0].isloggedin)

                    const payload = {
                        userid: loginResponse1.rows[0].id,
                        username: loginResponse1.rows[0].username
                    }

                    const token = jwt.sign(payload, process.env.TOKEN_SECRET) 

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
    
    try {     
        const logOutBool = await pool.query(`UPDATE users SET isloggedin = $1 WHERE id = $2 RETURNING *`, 
        [false, userid]);
        console.log('logoutbool', logOutBool.rows[0])
        res.send('See you later!' )
    }
    catch(err) {
        console.log(err)
    }
})

module.exports = router;