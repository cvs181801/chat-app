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
                console.log(username, password)
                
                const newUser = await pool.query(`INSERT INTO users(username, password, hash, salt) VALUES ($1, $2, $3, $4) RETURNING *`, 
                [username, password, hash, salt]);
                console.log('user rows', newUser.rows[0])
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
    console.log(username, password)

    const loginQuery = {
        name: "select-user",
        text: 'SELECT * FROM users WHERE username = $1',
        values: [username]
    }  

    try {
        const loginResponse1 = await pool.query(loginQuery);
        if (loginResponse1.rows[0].password === password) {
            console.log(loginResponse1.rows[0].hash)
            const hash = loginResponse1.rows[0].hash;
            bcrypt.compare(password, hash, function(err, result) {
                if(result == true) {
                    res.send("welcome back!")
                } else {
                    console.log(err)
                }
            });
        
        } else {
            console.log('Something went wrong.  Please try again..')
            res.send("Something went wrong.  Please try again.")
        }
    } catch(e) {
        console.error(e.stack)
        res.send(["Something went wrong.  Please try again.", e.stack])
    }

})

module.exports = router;