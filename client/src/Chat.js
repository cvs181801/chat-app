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

const [users, setUsers] = useState([])

const [englishChats, setEnglishChats] = useState(
    [
       {
            chat_id: 4,
            user_id: 3,
            text: "hey, what's upall."
        },
        {
            chat_id: 5,
            user_id: 3,
            text: "I want tacos!"
        },
        {
            chat_id: 6,
            user_id: 2,
            text: "??"
        }

    ]
)

const [chineseChats, setChineseChats] = useState(
    [
        {
            chat_id: 7,
            user_id: 3,
            text: "你好"
        },
        {
            chat_id: 8,
            user_id: 3,
            text: "你从哪里来？"
        },
        {
            chat_id: 9,
            user_id: 2,
            text: "我从 中国 来。"
        }
    ]
)

const [spanishChats, setSpanishChats] = useState(
    [
        {
            chat_id: 10,
            user_id: 3,
            text: "¿Cómo te llamas?"
        },
        {
            chat_id: 11,
            user_id: 1,
            text: "Me llamo Kermit."
        },
        {
            chat_id: 12,
            user_id: 2,
            text: "¿Me puede pasar la sal/la pimienta?"
        } 
    ]
)



const englishChatsLoop = englishChats.map(chat=> {
    return <p key={chat.chat_id}>{chat.text}</p>
})  

const spanishChatsLoop = spanishChats.map(chat=> {
    return <p key={chat.chat_id}>{chat.text}</p>
})  

const chineseChatsLoop = chineseChats.map(chat=> {
    return <p key={chat.chat_id}>{chat.text}</p>
})  

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

// function postMessage() {
//     setMessage(messageInputValue)
// }

async function getUsers() {
    try {
        var search = await axios.get('api/users')
        return search
    }
    catch(err) {
        console.log(err)
    }
}

useEffect(()=>{
    getUsers()
        .then((res) => {
         console.log(res.data)
         setUsers([res.data])
    })
},[])

useEffect(()=> {
    console.log(users)
}, [users])

const usersLoop = users.map(user => {
    return <Usercard key={user.id} username={user.username}/>
  })

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
            >{englishChatsLoop}
                {/* <p>{message}</p> */}
            </div>
            <div
                id="spanish"
                className={spanishtabclass}
            >{spanishChatsLoop}
                {/* <p>{message}</p> */}
            </div>
            <div
                id="chinese"
                className={chinesetabclass}
            >{chineseChatsLoop}
                {/* <p>{message}</p> */}
            </div> 
        </div>

        <div
            className="message_area"
        >
            {/* <input
                type='text'
                placeholder='Type your message here!'
                //onChange={event=>setMessageInputValue(event.target.value)}
            > </input> */}
            <button
                //onClick={postMessage}
            >post</button>
        </div>

      </div>
      <Link to="/"
            className= "nav_link">
                Log Out
      </Link>
  </div>
}
