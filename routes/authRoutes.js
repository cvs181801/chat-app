const express = require('express')
const app = express()
const Pool = require('pg').Pool;
const router = express.Router();
const pool = require('../db-pool')
const bcrypt = require('bcrypt');
const saltRounds = 10;

//const myPlaintextPassword = 'doodle';

router.post(`/register`, (req, res)=> {
    console.log(req.body)
    let {username, password} = req.body;
    
    try {
        bcrypt.genSalt(saltRounds, async function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) { //adding async returns a promise! 
                console.log('hash :', hash)
                console.log('salt :', salt)
                //console.log(username, password)
                
                const newUser = await pool.query(`INSERT INTO users(username, password) VALUES ($1, $2) RETURNING *`, 
                [username, hash]);
                console.log('user rows', newUser.rows[0].username)
                res.send(newUser.rows[0].username)
            })
        })
    }
    catch(err) {
        console.log(err)
    }
})

router.post(`/login`, async (req, res)=> {
    console.log(req.body)
    let {username, password} = req.body;
    //console.log(username, password)

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
                    res.send(["Welcome back!", loginResponse1.rows[0].id, loginResponse1.rows[0].username])
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
    let {username, isloggedin} = req.body;
    console.log(username, isloggedin)
    
    try {     
        const logOutNow = !isloggedin;
        const logOutBool = await pool.query(`UPDATE users SET isloggedin = $2 WHERE username = $1 RETURNING *`, 
        [username,logOutNow]);
        console.log('logoutbool', logOutBool.rows[0].username, logOutBool.rows[0].isloggedin)
        res.send('See you later!' )
    }
    catch(err) {
        console.log(err)
    }
})

module.exports = router;