const express = require('express')
const app = express()
const router = express.Router();
const pool = require('../db-pool')

router.get(`/users`, async (req, res)=> {
    
    try {
        const usernames = await pool.query('SELECT id, username FROM users WHERE isloggedin = true') 
        
        res.send(usernames.rows)
        } 
    catch(err) {
        res.send('something went wrong')
        }    
})

router.get(`/loggedusers`, async (req, res)=> { 
    
    try{
        const loggedUser =  await pool.query('SELECT id, username FROM users WHERE isloggedin = true');
            res.send(loggedUser.rows)
    } 
    catch(err){
        res.send(['something went wrong', err])
    }
    
})

module.exports = router;