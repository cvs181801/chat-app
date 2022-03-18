const express = require('express')
const app = express()
const router = express.Router();
const pool = require('../db-pool')

router.get(`/users`, async (req, res)=> {
    
    try {
        const usernames = await pool.query('SELECT id, username FROM users WHERE isloggedin = true') 
        //console.log(usernames.rows)
        
        res.send(usernames.rows)
        } 
    catch(err) {
        console.log(err)
        }    
})

router.get(`/loggedusers`, async (req, res)=> { 
    
    try{
        const loggedUser =  await pool.query('SELECT id, username FROM users WHERE isloggedin = true');
            console.log('logged user rows :', loggedUser.rows)
           
            res.send(loggedUser.rows)
    } 
    catch(err){
        console.log(err)
    }
    
})

module.exports = router;