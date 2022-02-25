const express = require('express')
const app = express()
const Pool = require('pg').Pool;
const router = express.Router();
const pool = require('../db-pool')

router.post(`/login`, async (req, res)=>{
    console.log(req.body)
    let {username, password} = req.body;
    console.log(username, password)
    try{
        const newUser = await pool.query(`INSERT INTO users(username, password) VALUES ($1, $2) RETURNING *`, 
        [username, password]);
        //console.log(newUser)
        console.log('user', newUser)
        console.log('rows :', newUser.rows[0])
        res.send(newUser.rows[0].username)
    }
    catch(err) {
        console.log(err)
    }

})

module.exports = router;