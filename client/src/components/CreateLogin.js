import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom"
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import '../index.scss';
//import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

export default function CreateLogin(props) {

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
  event.preventDefault(); 
  setConfirmMsg('')
  if (username !== "" && password !== "" ) {
    addNewUser()
    .then(response => {
      setScreenname(response.data)
      setConfirmed(true)
      setConfirmMsg("Welcome!  Please log in.")
    })
  } else {
    setConfirmMsg('Oops - please enter a username and password to register!')
  }
}

useEffect(()=> {
  if(confirmed) {
    setConfirmMsg(`Welcome, ${screenname}!  You may now go back to the home page to log in.`)
  }
},[confirmed])

useEffect(()=>{}, [])

  return <div 
    className="container_createlogin"
    style={{
      backgroundColor: props.theme === "light" ? "white" : "#02024b",
       color: props.theme === "dark" ? "white" : "#02024b",
      }}
    >

  <Link to="/"
    className = {props.theme === "light" ? "nav_link--createlogin" : "nav_link--createlogin--dark"}
    >  ← Back
  </Link >

   <Form
    className='createlogin_form'
    onSubmit={(event)=>handleSubmit(event)}
  >
    <Form.Group className="createlogin_username" controlId="formBasicUsername">
      <Form.Label>Login Username (this will also be your screenname)</Form.Label>
      <Form.Control
        type="text"
        placeholder="login username"
        onChange={event=>setUsername(event.target.value)}
        value={username}
        style={{
          backgroundColor: props.theme === "light" ? "white" : "#02024b",
          color: props.theme === "dark" ? "white" : "#02024b",
         }}
      />
    </Form.Group>

    <Form.Group className="createlogin_password" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control
        type="password"
        placeholder="password"
        onChange={event=>setPassword(event.target.value)}
        value={password}
        style={{
          backgroundColor: props.theme === "light" ? "white" : "#02024b",
          color: props.theme === "dark" ? "white" : "#02024b",
         }}
      />
    </Form.Group>
    <Button
      className="createlogin_button" 
      type="submit"
      variant={props.theme ==="light" ? "secondary" : "light"}
      
    >Register</Button>
    
  </Form>   

        <div 
          className="confirmedMsg"
        >
            {confirmed ? confirmMsg : ''}
        </div>

  </div>;
}
