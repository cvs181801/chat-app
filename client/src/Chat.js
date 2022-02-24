import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom"
import Usercard from './Usercard'
import axios from 'axios'

export default function Chat() {

const [messageInputValue, setMessageInputValue] = useState('')
const [allmessages, setAllMessages] = useState([])
const [users, setUsers] = useState([])

function postMsg() {
    const data = {
        text: messageInputValue,
      }
    console.log(messageInputValue)
    const response = axios.post(`/api/messages`, data);
    console.log(response.data)
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

useEffect(()=> {
    async function getMessages() {
        try {
            const response = await axios.get('api/messages')
            console.log('all messages :', response.data)
            setAllMessages(response.data)
        }
        catch(err) {
            console.log(err)
        }
    }
    getMessages();
}, [])

// useEffect(()=> {
//     for (var i=0; i< allmessages.length; i++ ) {
//         for (var j=0; j< allmessages[i].length; j++ ) {
//            if (allmessages[i][j].lang === 'EN') {
//                englishChats.push(allmessages[i][j])
//                setENchats(englishChats)
//                console.log('english chats :', englishChats)
//                console.log(ENchats)
//            } else if (allmessages[i][j].lang === 'SP') {
//                spanishChats.push(allmessages[i][j])
            
//            } else if (allmessages[i][j].lang === 'CH') {
//                chineseChats.push(allmessages[i][j])
//            } 
//         }
//    }
//     console.log('allmsgs :', allmessages)
//     console.log(ENchats)
// }, [users, allmessages])

const allUsers = users.map(user => {
    return <Usercard key={user.id} username={user.username}/>
  })

// const allChats = allmessages.map(msg => {
//     return <p key={msg.chat_id}>{msg.text}</p>
// })
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
                {/* {allChats}   */}
                 
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
      <Link to="/"
            className= "nav_link">
                Log Out
      </Link>
  </div>
}

