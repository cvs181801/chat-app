import React, {useState, useEffect, useContext} from 'react';
import App from '../App'
import {Link} from "react-router-dom"
import axios from 'axios'
import Chat from './Chat'
import CreateLogin from './CreateLogin';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.css';

export default function Home() {

const [usernameInputValue, setUsernameInputValue] = useState('');
const [passwordInputValue, setPasswordInputValue] = useState('');
const [loggedIn, setLoggedIn] = useState(false);
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
                    localStorage.setItem(`user`, `${res.data[2]}`)
                    console.log(res.data[2])
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
                        <button
                            className="loginBtn"
                            onClick={handleClick}
                        >Log In
                        </button>

                        
                        <div> 
                            {loggedIn ? 
                        <Link to="/chat"
                            className= "nav_link"
                            // render={(loggedInUsers)=>(
                            //     <UserContext>
                            //         <Chat {...loggedInUsers}/>
                            //     </UserContext>
                            //)}
                            >
                            Enter the Chat
                            </Link> : ''} 
                            
                        </div>
                        
                        <p>{error}</p>
                        <p>New here? 
                            <Link to="/createlogin"
                            className= "nav_link"
                            // render={(loggedInUsers)=>(
                            //     <UserContext>
                            //         <CreateLogin {...loggedInUsers}/>
                            //     </UserContext>
                            // )}
                            >Create a login
                            </Link > or 
                            <Link to="/chat"
                            className= "nav_link"
                            // render={(loggedInUsers)=>(
                            //     <UserContext>
                            //         <Chat {...loggedInUsers}/>
                            //     </UserContext>
                            // )}
                            >view as a guest
                            </Link> 
                            
                        </p>
                    
                </form>                

            </div>

         </div>
       
}


