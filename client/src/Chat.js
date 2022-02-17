import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom"
import Usercard from './Usercard'
import axios from 'axios'

export default function Chat() {

const [englishtabclass, setEnglishtabclass] = useState('activeTab')
const [spanishtabclass, setSpanishtabclass] = useState('inactiveTab')
const [chinesetabclass, setChinesetabclass] = useState('inactiveTab')
const [messageInputValue, setMessageInputValue] = useState('')
const [allmessages, setAllMessages] = useState([])
const [ENchats, setENchats] = useState('')

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

async function postMyMessage() { 
    try { 
        var search = await axios.get(`/api/messages?text=${messageInputValue}`)
        return search;

        }
        catch(err){
            console.log(err)
        }
    }

function postMsg() {
    postMyMessage()
        .then(res => {
            console.log(res.data)
    })
}

let englishChats = []
let spanishChats = []
let chineseChats = []


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

// const englishChatRoom = ENchats.map(chat=> {
//             return <p key={chat.chat_id}>{chat.text}</p>
//             })    

// const spanishChats = spanishChats.map(chat=> {
//     return <p key={chat.chat_id}>{chat.text}</p>
// })  

// const chineseChats = chineseChats.map(chat=> {
//     return <p key={chat.chat_id}>{chat.text}</p>
// })  

const allChats = allmessages.map(msg => {
    return <p key={msg.chat_id}>{msg.text}</p>
})

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
                {allChats}  
                 
            </div>
            <div
                id="spanish"
                className={spanishtabclass}
             > 
             {/* {spanishChats}  */}
                
            </div>
            <div
                id="chinese"
                className={chinesetabclass}
            > 
             {/* {chineseChats}  */}
            
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

