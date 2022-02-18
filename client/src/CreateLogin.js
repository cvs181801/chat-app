import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom"
import axios from 'axios';

export default function CreateLogin() {

const [screenname, setScreenname] = useState('')
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')

async function createUser() {
    try {
        const response = await axios.get(`/api/users?reg=${screenname}/${username}/${password}`) 
        return response;
    }
    catch(err) {
        console.log(err)
    }
}

function handleSubmit(event) { 
  event.preventDefault()
  createUser()
  .then(res=>{
    console.log(res.data)
  })
}

  return <div>
    <form
      onSubmit={handleSubmit}
    >
       <label>Choose a screen name:</label>
       <input 
          type="text"
          placeholder="choose a screenname"
          onChange={event=>setScreenname(event.target.value)}
          value={screenname}

       ></input>  
       <label>Login username:</label>
       <input 
          type="text"
          placeholder="login username"
          onChange={event=>setUsername(event.target.value)}
          value={username}
        ></input>  
       <label>Password</label>
       <input 
          type="password"
          placeholder="password"
          onChange={event=>setPassword(event.target.value)}
          value={password}
       ></input> 
       <button
          type="submit"
       >Register</button> 
       
    </form>
      <Link to="/"
            className= "nav_link">
                Log In
      </Link>
  </div>;
}
//create mock 'create your login' functionality
//draft up tables