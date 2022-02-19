import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom"
import axios from 'axios';
//const cors = require("cors")

export default function CreateLogin() {

const [username, setUsername] = useState('')
const [password, setPassword] = useState('')

const registration = {
  username: `${username}`,
  password: `${password}`
}

function handleSubmit(event) { 
  event.preventDefault()
    axios.post(`/api/users`, registration) 
      .then(res=>{
        console.log(res.data)
      })
}

  return <div>
    <form
      onSubmit={handleSubmit}
    >
       <label>Login username (this will also be your screen name): </label>
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
