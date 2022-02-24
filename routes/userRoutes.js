const express = require('express')
const app = express()
//const pool = require('pg').Pool;

//const { Pool } = require('pg')
//const pool = new Pool()
const router = express.Router();
const pool = require('../db-pool')
console.log(pool);

router.get(`/users`, async (req, res)=> {
    try {
        const usernames = await pool.query('SELECT username, password FROM users')
        //console.log(usernames.rows)
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