import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom"
import Usercard from './Usercard'
import axios from 'axios'

export default function Chat() {

const [englishtabclass, setEnglishtabclass] = useState('activeTab')
const [spanishtabclass, setSpanishtabclass] = useState('inactiveTab')
const [chinesetabclass, setChinesetabclass] = useState('inactiveTab')
//const [message, setMessage] = useState('')
//const [messageInputValue, setMessageInputValue] = useState('')
const [allmessages, setAllmessages] = useState('')

const [users, setUsers] = useState([])

function openTabEnglish() {
    setEnglishtabclass('activeTab')
    setSpanishtabclass('inactiveTab')
    setChinesetabclass('inactiveTab')
}
function openTabSpanish() {
    setEnglishtabclass('inactiveTab')
    setSpanishtabclass('activeTab')
    setChinesetabclass('inactiveTab')
}
function openTabChinese() {
    setEnglishtabclass('inactiveTab')
    setSpanishtabclass('inactiveTab')
    setChinesetabclass('activeTab')
}

 function postMessage() {
     setMessage(messageInputValue)
 }

async function getUsers() {
    try {
        var search = await axios.get('api/users')
        return search
    }
    catch(err) {
        console.log(err)
    }
}

async function getMessages() {
    try {
        var search = await axios.get('api/messages')
        return search
    }
    catch(err) {
        console.log(err)
    }
}

useEffect(()=>{
    getUsers()
        .then((res) => {
         console.log('users :', res.data)
         setUsers(res.data)
    })
    getMessages()
        .then((res)=>{
            console.log('messages :', res.data)
            setAllmessages(res.data)
        })
},[])

useEffect(()=> {
    console.log('users :', users,'allmessages :', allmessages) 
    let [usersArray] = users;
    let spanishMsgs = allmessages[1];
    console.log(spanishMsgs)
    
}, [users, allmessages])

const usersLoop = users.map(user => {
    return <Usercard key={user.id} username={user.username}/>
  })

// const englishChats = englishChats.map(chat=> {
//     return <p key={chat.chat_id}>{chat.text}</p>
// })  

// const spanishChats = spanishChats.map(chat=> {
//     return <p key={chat.chat_id}>{chat.text}</p>
// })  

// const chineseChats = chineseChats.map(chat=> {
//     return <p key={chat.chat_id}>{chat.text}</p>
// })  

  return <div>
      <div
        className="chatContainer"
      >
        <div
            className="chat_usersArea"
          >
              {usersLoop}
        </div>

        <div
            className="chat_area"
        >
            <button
                onClick={openTabEnglish}
            >English</button>
            <button
                onClick={openTabSpanish}
            >Espanol</button>
            <button
                onClick={openTabChinese}
            >中文</button> 

            <div
                id="english"
                className={englishtabclass}
             >
            {/* {englishChats} */}
                 
            </div>
            <div
                id="spanish"
                className={spanishtabclass}
             > 
            {/*  {spanishChats} */}
                
            </div>
            <div
                id="chinese"
                className={chinesetabclass}
            > 
            {/* {chineseChats} */}
            
            </div> 
        </div>

        <div
            className="message_area"
        >
            <input
                type='text'
                placeholder='Type your message here!'
                onChange={event=>setMessageInputValue(event.target.value)}
            > </input> 
            <button
                onClick={postMessage}
            >post</button>
        </div>

      </div>
      <Link to="/"
            className= "nav_link">
                Log Out
      </Link>
  </div>
}

//a 'see all chats' button
//a 'post my chat' button 