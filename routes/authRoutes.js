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


router.post(`/login`, async (req, res)=> {
    console.log(req.body)
    let {username, password} = req.body;
    console.log(username, password)

    const loginQuery = {
        name: "select-user",
        text: 'SELECT * FROM users WHERE username = $1',
        values: [username]
    }  
    
        const loginResponse = await pool
            .query(loginQuery)
            .then((res)=>{
                console.log(res.rows[0].username)
                if(res.rows[0].password == password) {
                    return true;
                } else {
                    return false;
                }
            })
            .catch((e)=>{
                console.error(e.stack)
                //res.send(['Username not found. Please try again.', e.stack])
                return false;
            })

    if (loginResponse) {
        console.log('Welcome back!')
        res.send("welcome back!")
    } else {
        console.log('Please try re-entering your password, or re-set your password here.')
        res.send("Something went wrong.  Please try again.")
    }
})

module.exports = router;