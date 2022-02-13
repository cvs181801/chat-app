import React, {useState} from 'react';
import {Link} from "react-router-dom"
import Usercard from './Usercard'

export default function Chat() {

const [users, setUsers] = useState(
    [
        {
            id: 1,
            username: 'green123',
            password: 'hatsoff'
        },
        {
            id: 2,
            username: 'SammieGurl',
            password: 'hacktheplanet24' 
        },
        {
            id: 3,
            username: 'TacoTownLover',
            password: 'tacos_forever'    
        }
    ]
)

const [englishChats, setEnglishChats] = useState(
    [
       {
            user_id: 3,
            text: "hey, what's upall."
        },
        {
            user_id: 3,
            text: "I want tacos!"
        },
        {
            user_id: 2,
            text: "??"
        }

    ]
)

const [chineseChats, setChineseChats] = useState(
    [
        {
            user_id: 3,
            text: "你好"
        },
        {
            user_id: 3,
            text: "你从哪里来？"
        },
        {
            user_id: 2,
            text: "我从 中国 来。"
        }
    ]
)

const [spanishChats, setSpanishChats] = useState(
    [
        {
            user_id: 3,
            text: "¿Cómo te llamas?"
        },
        {
            user_id: 1,
            text: "Me llamo Kermit."
        },
        {
            user_id: 2,
            text: "¿Me puede pasar la sal/la pimienta?"
        } 
    ]
)

const usersLoop = users.map(user => {
    return <Usercard key={user.id} username={user.username}/>
  })

const englishChatsLoop = englishChats.map(chat=> {
    return <p key={chat.user_id}>{chat.text}</p>
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
            {englishChatsLoop}
        </div>

        <div
            className="message_area"
        >
            <p>Type your message here! </p>
        </div>
      </div>
      <Link to="/"
            className= "nav_link">
                Log Out
      </Link>
  </div>;
}
