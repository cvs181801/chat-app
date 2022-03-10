import React, {useState, useEffect, useContext} from 'react';
import App from '../App'
import {Link} from "react-router-dom"
import axios from 'axios'
import Chat from './Chat'
import CreateLogin from './CreateLogin';
import '../index.scss';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button'

export default function Home() {

const [usernameInputValue, setUsernameInputValue] = useState('');
const [passwordInputValue, setPasswordInputValue] = useState('');
//const [loggedIn, setLoggedIn] = useState(false);
const [error, setError] = useState('');


const loginObj = {
    username: usernameInputValue,
    password: passwordInputValue
}

async function login() {
    try {
        var search = await axios.post('api/login', loginObj)
        return search
    }
    catch(err) {
        console.log(err)
    }
}

function handleClick(event) {
    event.preventDefault();
    if (usernameInputValue !== "" && passwordInputValue !== "" ) {
        login()
            .then(res=>{
                if(res.data[0] === "Welcome back!") {
                    console.log(res.data)
                    localStorage.setItem(`userid`, `${res.data[1]}`)
                    localStorage.setItem(`username`, `${res.data[2]}`)
                    window.location.reload()
                } else {
                    setError('sorry, something went wrong!  Please try again.')
                }
            })
    } else {
        setError('User not found...please try again.')
    }
}

  return <div>
            <div className="container">
                <h1
                    className="title"
                >Hey. Let's Chat.</h1>
                <p
                    className="title_login"
                >Please Login</p>

            
                <form>
                    <div
                        className="container_input"
                    >
                        
                        <input
                            type="text"     
                            placeholder="username"
                            value={usernameInputValue}
                            onChange={event=>setUsernameInputValue(event.target.value)}
                        ></input>
                        <input
                            type="password"     
                            placeholder="password"
                            value={passwordInputValue}
                            onChange={event=>setPasswordInputValue(event.target.value)}
                        ></input>
                    </div>
                        <Button
                            className="button_home"
                            variant="outline-warning"
                            onClick={handleClick}
                        >Log In
                        </Button>

                        {/*      //****                   
                        <div> 
                            {loggedIn ? 
                        <Link to="/chat"
                            className= "nav_link"
                            >
                            Enter the Chat
                            </Link> : ''} 
                            
                        </div> */}
                        
                        <p>{error}</p>
                        <p
                            className="home_link"
                        >New here? 
                            <Link to="/createlogin"
                            className= "nav_link"
                            >  Create a login
                            </Link >
                            
                        </p>
                    
                </form>   
                    
            </div>

         </div>
       
}


