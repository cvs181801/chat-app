import React, {useEffect, useState, useContext} from 'react';
import {Link} from "react-router-dom"
import Usercard from './Usercard'
import axios from 'axios'
import { io } from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.css';
import '../index.scss';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'


const socket = io();

export default function Chat() {

const [messageInputValue, setMessageInputValue] = useState('')
const [allmessages, setAllMessages] = useState([])
//const [users, setUsers] = useState([])
const [newMsgQueued, setNewMsgQueued] = useState(false)
const [newUserJoined, setNewUserJoined] = useState(true)
const [loggedInUsers, setLoggedInUsers] = useState([])
//console.log(loggedInUsers)

function postMsg() {
    setMessageInputValue('')
    //setNewMsgQueued(false)
    const msgData = {
        userid: localStorage.getItem('userid'),
        text: messageInputValue
      }
   // console.log(messageInputValue)
    const response = axios.post(`/api/messages`, msgData);
    console.log(response)
    //setNewMsgQueued(true)
}

const logoutObj = {
    userid: localStorage.getItem('userid'),
    username: localStorage.getItem('username')
}

function logOut() {
    //setNewUserJoined(false)
    async function logout() {
        try {
            var response = await axios.post('api/logout', logoutObj)
            //console.log(response)
            //return response
            if(response.data === "See you later!") {
                localStorage.removeItem('userid')
                localStorage.removeItem('username')
                console.log('see you later!')
                //const checkit = localStorage.getItem('userid');
                //console.log(checkit)
                window.location.reload()
            } else {
               console.log("please try logging out again")
            }
        }
        catch(err) {
            console.log(err)
        }
    }
    logout();
}

useEffect(()=> {
    async function getUsers() {
        try {
            const response = await axios.get('api/users')
            console.log(response.data)
            setLoggedInUsers(response.data)
        }
        catch(err) {
            console.log(err)
        }
    }
  
    getUsers(); 
  },[])

useEffect(()=> {
    socket.on("newMessage", (data)=>{
        setAllMessages((allMessages)=>[...allMessages, data.msg])
        console.log(data)
    });
    async function getMessages() {
        try {
            const response = await axios.get('api/messages')
            //console.log('all messages :', response.data)
            setAllMessages(response.data)
        }
        catch(err) {
            console.log(err)
        }
    }

    getMessages();
}, [])

useEffect(()=>{
    console.log(loggedInUsers)
    // const checkit = localStorage.getItem('userid');
    // console.log(checkit)
    // const checkitname = localStorage.getItem('username');
    // console.log(checkitname)
   
})


const allUsers = loggedInUsers.map(user => {
    return <Usercard key={user.id} username={user.username}/>
  })

const allChats = allmessages.map(msg => {
    return <Card key={msg.chat_id}>{msg.username}: {msg.text}</Card>
})
console.log(allmessages)

  return <div>
      <Container
        className="chatContainer"
      >
            <Card
                className="chat_usersArea"
                style={{backgroundColor: "#fadfbb"
                        }}
            >
                {allUsers} 
            </Card>

                
  
            <Card
                className="chat_area"
            >
                {allChats}  
            </Card>
   
        </Container>

        <div
            className="message_area"
        >

            <input 
                type="text"     
                placeholder="Type your message here"
                value={messageInputValue}
                onChange={event=>setMessageInputValue(event.target.value)}> 
            </input>

            <Button
                onClick={postMsg}
                variant="secondary"
                className="chat_button"
            >post
            </Button> 

        </div>
    
      <Button
        onClick={logOut}
        className="chat_button"
        variant="secondary"
      >Log Out
      </Button>

  </div>
}

