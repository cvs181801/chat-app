import React, {useState} from 'react';
import {Link} from "react-router-dom"
import axios from 'axios'
import Context from './Context'

export default function Home() {

const [usernameInputValue, setUsernameInputValue] = useState('');
const [passwordInputValue, setPasswordInputValue] = useState('');
const [loggedIn, setLoggedIn] = useState(false);
const [error, setError] = useState('');
const [loggedInUsers, setLoggedInUsers] = useState([])

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
                console.log(res.data)
                setLoggedInUsers(res.data.username)  //need to spread in at all ? or use socket.io?
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
                        <button
                            className="loginBtn"
                            onClick={handleClick}
                        >Log In
                        </button>
                        <div>{loggedIn ? 
                            <Link to="/chat"
                            className= "nav_link"
                            >Enter the Chat
                            </Link > : ''}
                        </div>
                        <p>{error}</p>
                        <p>New here? 
                            <Link to="/createlogin"
                            className= "nav_link"
                            >Create a login
                            </Link > or 
                            <Link to="/chat"
                            className= "nav_link"
                            >view as a guest
                            </Link> 
                        </p>
                </form>

                 <Context.Provider value={[loggedInUsers]}>
                    
                </Context.Provider> 

            </div>

         </div>
       
}


