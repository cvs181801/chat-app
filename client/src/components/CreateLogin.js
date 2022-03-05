import React, {useState, useEffect, useContext} from 'react';
import {Link} from "react-router-dom"
import axios from 'axios';
import UserContext from '../contexts/UserContext'
import 'bootstrap/dist/css/bootstrap.css';

export default function CreateLogin() {

const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [confirmMsg, setConfirmMsg] = useState('')
const [confirmed, setConfirmed] = useState(false);
const [screenname, setScreenname] = useState('')

const registration = {
  username: username,
  password: password
}

async function addNewUser() {
  const response = await axios.post(`/api/register`, registration) 
  return response
}

function handleSubmit(event) {
  event.preventDefault() 
    addNewUser()
      .then(response => {
        console.log(response.data)
        setScreenname(response.data)
        setConfirmed(true)
      })
}

useEffect(()=> {
  if(confirmed) {
    setConfirmMsg(`Welcome, ${screenname}!  You may now log in.`)
  }
},[confirmed])

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

    {confirmed ? confirmMsg : ''}
      <Link to="/"
            className= "nav_link">
                Log In
      </Link>
  </div>;
}
