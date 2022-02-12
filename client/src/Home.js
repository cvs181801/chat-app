import React, {useState} from 'react';
import {Link} from "react-router-dom"

export default function Home() {

const [usernameInputValue, setUsernameInputValue] = useState('');
const [passwordInputValue, setPasswordInputValue] = useState('');
const [loggedIn, setLoggedIn] = useState(false);

function handleClick() {
    if (usernameInputValue !== "" && passwordInputValue !== "" ) {
        console.log('liuakinwaekufhskjanusdhjkfabmjsahsfdjkhnsajvkfakfdj')
        setLoggedIn(true);
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
                            </Link > : ''}</div>
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

