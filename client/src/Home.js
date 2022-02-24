import React, {useState} from 'react';
import {Link} from "react-router-dom"
import axios from 'axios'

export default function Home() {

const [usernameInputValue, setUsernameInputValue] = useState('');
const [passwordInputValue, setPasswordInputValue] = useState('');
const [loggedIn, setLoggedIn] = useState(false);
const [error, setError] = useState('');

async function login() {
    try {
        var search = await axios.get('api/users')
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
                if (res.data[0].username === usernameInputValue && res.data[0].password === passwordInputValue) {
                    setError(false);
                    setLoggedIn(true);
                    console.log('login , yes', res.data[0].username, usernameInputValue)
                } else {
                    setError(true);
                    setLoggedIn(false);
                    console.log('login, no', res.data[0].password, passwordInputValue)
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

            </div>

         </div>
       
}

//upon clicking 'login' , return a user id that will essentially allow the user to log in
//that user id gets saved in local storage to allow user to log in.
//local storage: later
//browser router 'go' will automatically send the user to new page upon login/authentication
