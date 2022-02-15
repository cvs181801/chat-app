import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom"
import Usercard from './Usercard'
import axios from 'axios'

export default function Chat() {

const [englishtabclass, setEnglishtabclass] = useState('activeTab')
const [spanishtabclass, setSpanishtabclass] = useState('inactiveTab')
const [chinesetabclass, setChinesetabclass] = useState('inactiveTab')
const [message, setMessage] = useState('')
const [messageInputValue, setMessageInputValue] = useState('')
const [allmessages, setAllmessages] = useState('')
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

 function postMessage() {
    console.log('yes')
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

// function postMsg() { axios({
//     method: 'post',
//     url: 'http://localhost:3000/api/messages',
//     data: {
//       firstName: 'Fred',
//       lastName: 'Flintstone'
//     }
//   });
// }

// postMsg();

useEffect(()=>{
    getUsers()
        .then((res) => {        
         setUsers(res.data)
    })
    getMessages()
        .then((res)=>{   
            setAllmessages(res.data)
        })
},[])

let englishChats = []
let spanishChats = []
let chineseChats = []

useEffect(()=> {
    console.log('users :', users,'allmessages :', allmessages) 
    let [usersArray] = users;
    console.log('allmsgs :', allmessages)
    for (var i=0; i< allmessages.length; i++ ) {
         for (var j=0; j< allmessages[i].length; j++ ) {
            if (allmessages[i][j].lang === 'EN') {
                englishChats.push(allmessages[i][j])
                setENchats(englishChats)
                console.log(ENchats)
            } else if (allmessages[i][j].lang === 'SP') {
                spanishChats.push(allmessages[i][j])
             
            } else if (allmessages[i][j].lang === 'CH') {
                chineseChats.push(allmessages[i][j])
       
            } 
         }
    }
    

}, [users, allmessages])



const usersLoop = users.map(user => {
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
            {/* <input
                type='text'
                placeholder='Type your message here!'
                onChange={event=>setMessageInputValue(event.target.value)}
            > </input> 
            <button
                onClick={postMessage}
            >post</button> */}
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