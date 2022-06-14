import React, {useEffect, useState} from 'react';
import Usercard from './Usercard'
import axios from 'axios'
import { io } from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.css';
import '../index.scss';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
// import InputGroup from 'react-bootstrap/InputGroup'
// import FormControl from 'react-bootstrap/FormControl';
// import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import {
    useHistory
  } from "react-router-dom";

const socket = io();

function Chat(props) {

const [messageInputValue, setMessageInputValue] = useState('')
const [allmessages, setAllMessages] = useState([])
const [loggedInUsers, setLoggedInUsers] = useState([])
const [chatMsg, setChatMsg] = useState('')

let history = useHistory();

function postMsg() {
    setMessageInputValue('')
    setChatMsg('')
        const msgData = {
            userid: localStorage.getItem('userId'),
            text: messageInputValue
        }
    const response = axios.post(`/api/messages`, msgData);
}

const logoutObj = {
    userid: localStorage.getItem('userId'),
    username: localStorage.getItem('username')
}

function logOut() {
    async function logout() {
        try {
            var response = await axios.post('api/logout', logoutObj)
            if(response.data === "See you later!") {
                localStorage.removeItem('userId')
                localStorage.removeItem('username')
                console.log('see you later!')
                history.push("/")

            } else {
               setChatMsg("Please try logging out again.")
            }
        }
        catch(err) {
            console.log(err)
        }
    }

    logout();  
}

 useEffect(()=> {

    socket.on("loggedInUser", (data)=> { 
        setLoggedInUsers((loggedInUsers)=>[...loggedInUsers, data.user])
    });

    async function getUsers() {
        try {
            const response = await axios.get('api/users')
            setLoggedInUsers(response.data)
        }
        catch(err) {
            console.log(err)
        }
    }
    getUsers(); 
    
},[])

useEffect(()=> {

    socket.on("loggedOutUser", (data)=> {
        setLoggedInUsers((loggedInUsers) => loggedInUsers.filter((user) => user.id !== data.user.id))
    });

},[])

useEffect(()=> {
    socket.on("newMessage", (data)=>{
        setAllMessages((allMessages)=>[...allMessages, data.msg])
       
    });

    async function getMessages() {
        try {
            const response = await axios.get('api/messages')
            setAllMessages(response.data)
        }
        catch(err) {
            console.log(err)
        }
    }

    getMessages();
}, [])

const allUsers = loggedInUsers.map(user => {
    return <Usercard key={user.id} username={user.username} theme={props.theme}/>
  })

const allChats = allmessages.map(msg => {
    return <Card 
                key={msg.chat_id} 
                style={{
                    backgroundColor: props.theme === "light" ? "white" : "#02024b",
                    color: props.theme === "dark" ? "white" : "#02024b",
                    }} 
            >
                {msg.username}: {msg.text}
            </Card>
})

  return <div style={{backgroundColor: props.theme === "light" ? "white" : "#02024b"}}>
      <Container
        className="chatContainer"
      >
            <Card
                className="chat_usersArea"
                border="warning"
                style={{backgroundColor: "transparent"
                        }}
            >
                {allUsers} 
            </Card>
  
            <Card
                className="chat_area"
                border="warning"
                style={{background: "transparent"
                        }}
            >
                {allChats}  
            </Card>
   
        </Container>

        <div
            className="message_area"
        >
 
            <Form
                onSubmit={(event)=>postMsg(event)}
            >

                <Form.Control 
                    as="textarea" 
                    placeholder="Type your message here" 
                    value={messageInputValue}
                    onChange={event=>setMessageInputValue(event.target.value)}
                    style={{
                        backgroundColor: props.theme === "light" ? "white" : "#02024b",
                         color: props.theme === "dark" ? "white" : "#02024b",
                         height: "7em"
                        }}
                />

                <Button
                    type="submit"
                    variant="warning"
                    className="chat_button--post"
                >Post
                </Button> 
            </Form>

        </div>

        <div
            className="chat_logoutarea"
        >

        <Button
            onClick={logOut}
            className="chat_button"
            variant={props.theme ==="light" ? "secondary" : "light"}
        >Log Out
        </Button>

        <p>{chatMsg ? chatMsg : ''}</p>
        </div>
      

  </div>
}

export default Chat;
