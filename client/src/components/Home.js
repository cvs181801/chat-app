import React, {useState, useEffect, useContext} from 'react';
//import App from '../App'
import {Link, useHistory} from "react-router-dom"
import axios from 'axios'
import { io } from "socket.io-client";
//import Chat from './Chat'
//import CreateLogin from './CreateLogin';
import '../index.scss';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button'

export default function Home(props) {

const [usernameInputValue, setUsernameInputValue] = useState('');
const [passwordInputValue, setPasswordInputValue] = useState('');
const [error, setError] = useState('');
const [testUserData, setTestUserData] = useState('')

let history = useHistory();
//console.log(history)

const socket = io();

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
                if(res.data[3]) {
                    console.log(res.data)
                    const userId = res.data[1]
                    const username = res.data[2]
                    localStorage.setItem(`userId`, `${userId}`)
                    localStorage.setItem(`username`, `${username}`)
                    socket.on("loggedInUser", (data)=> { 
                        console.log("listening to users socket ! :", data)
                        //setTestUserData(data.user.userid)
                    });
                    //window.location.reload()
                    history.push("/chat")
                    
                   
                } else {
                    setError('sorry, something went wrong!  Please try again.')
                }
            })
    } else {
        setError('User not found...please try again.')
    }
}

  return <div
        className='container_home'
        >
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
                            style={{backgroundColor: props.theme === "light" ? "white" : "#02024b",
                                    color: props.theme === "light" ? "#313131" : "white"
                            }}
                        ></input>
                        <input
                            type="password"     
                            placeholder="password"
                            value={passwordInputValue}
                            onChange={event=>setPasswordInputValue(event.target.value)}
                            style={{backgroundColor: props.theme === "light" ? "white" : "#02024b",
                                    color:props.theme ===  "light" ? "#313131" : "white"
                            }}
                        ></input>
                    </div>
                        <Button
                            className="button_home"
                            variant="outline-warning"
                            onClick={handleClick}
                        >Log In
                        </Button>
                        
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
                    {/* {testUserData} */}
            </div>

         </div>
       
}


