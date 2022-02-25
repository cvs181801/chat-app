const express = require('express')
const app = express()
const Pool = require('pg').Pool;
const router = express.Router();
const pool = require('../db-pool')

router.post(`/register`, async (req, res)=>{
    console.log(req.body)
    let {username, password} = req.body;
    console.log(username, password)
    try{
        const newUser = await pool.query(`INSERT INTO users(username, password) VALUES ($1, $2) RETURNING *`, 
        [username, password]);
        console.log('user', newUser)
        console.log('rows :', newUser.rows[0])
        res.send(newUser.rows[0].username)
    }
    catch(err) {
        console.log(err)
    }
})


router.post(`/login`, (req, res)=> {
    console.log(req.body)
    let {username, password} = req.body;
    console.log(username, password)

    const loginQuery = {
        name: "select-user",
        text: 'SELECT username FROM users WHERE password = $1',
        values: [password]
    }

    pool.query(loginQuery, (err, res)=> {
        if (err) {
            console.log(err.stack)
        } else {
            console.log(res.rows[0])
            //res.send(res.rows[0])
        }    
    })
    res.send(res.rows[0])
})

module.exports = router;