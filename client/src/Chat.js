import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom"
import Usercard from './Usercard'
import axios from 'axios'
import { io } from "socket.io-client";

const socket = io();

export default function Chat() {

const [messageInputValue, setMessageInputValue] = useState('')
const [allmessages, setAllMessages] = useState([])
const [users, setUsers] = useState([])
const [newMsgQueued, setNewMsgQueued] = useState(false)
const [newUserJoined, setNewUserJoined] = useState(true)

function postMsg() {
    setMessageInputValue('')
    setNewMsgQueued(false)
    const data = {
        text: messageInputValue,
      }
    console.log(messageInputValue)
    const response = axios.post(`/api/messages`, data);
    console.log(response)
    setNewMsgQueued(true)
}

const logoutObj = {
    username: 'hoopla',
    isloggedin: true
}

function logOut() {
    setNewUserJoined(false)
    async function logout() {
        try {
            var search = await axios.post('api/logout', logoutObj)
            return search
        }
        catch(err) {
            console.log(err)
        }
    }
    logout();
}

useEffect(()=>{
    async function getUsers() {
        try {
            const response = await axios.get('api/users')
            setUsers(response.data)
        }
        catch(err) {
            console.log(err)
        }
    }

    getUsers(); 
},[])

useEffect(()=>{
    async function getUsers() {
        try {
            const response = await axios.get('api/users')
            setUsers(response.data)
        }
        catch(err) {
            console.log(err)
        }
    }

    getUsers(); 
},[newUserJoined])

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


// useEffect(()=>{
//     async function getNewMessages() {
//         try {
//             const response = await axios.get('api/messages')
//             console.log('all messages :', response.data)
//             setAllMessages(response.data)
//         }
//         catch(err) {
//             console.log(err)
//         }
//     }
//     getNewMessages();
// },[newMsgQueued])


const allUsers = users.map(user => {
    return <Usercard key={user.id} username={user.username}/>
  })

const allChats = allmessages.map(msg => {
    return <p key={msg.chat_id}>{msg.text}</p>
})
console.log(allmessages)

  return <div>
      <div
        className="chatContainer"
      >
        <div
            className="chat_usersArea"
          >
              {allUsers}
        </div>

        <div
            className="chat_area"
        >
            <div
                id="english"
                //className={englishtabclass}
             >
                 {allChats}  
                 
            </div>
        </div>

        <div
            className="message_area"
        >
            <input 
                type="text"     
                placeholder="Type your message here"
                value={messageInputValue}
                onChange={event=>setMessageInputValue(event.target.value)}> 
            </input>
            <button
                onClick={postMsg}
            >post</button> 

        </div>

      </div>
      {/* <Link to="/"
            className= "nav_link">
                Log Out
      </Link> */}
      <button
        onClick={logOut}
      >Log Out</button>
  </div>
}

