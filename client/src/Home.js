import React, {useState} from 'react';
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom"
import CreateLogin from './CreateLogin.js'
import Chat from './Chat.js'

export default function Home() {

const [usernameInputValue, setUsernameInputValue] = useState('');
const [passwordInputValue, setPasswordInputValue] = useState('');

function handleClick() {
    if (usernameInputValue !== "" && passwordInputValue !== "" ) {
        console.log('liuakinwaekufhskjanusdhjkfabmjsahsfdjkhnsajvkfakfdj')
    }
}

  return <BrowserRouter><div>
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
                        >Let's Go
                        </button>
                        <p>New here? 
                            <NavLink exact="true" to="/createlogin"
                            className= "nav_link"
                            >Create a login
                            </NavLink > or 
                            <Navlink exact="true" to="/chat"
                            className= "nav_link"
                            >view as a guest
                            </Navlink>

                        </p>
                </form>
                <Routes>
                    <Route path="/createlogin" element={<CreateLogin />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            
            </div>

         </div>
         </BrowserRouter>
}

