import React, {createContext, useState, useEffect} from 'react'
import axios from 'axios'
import { io } from "socket.io-client";
export const UserContext = createContext()
//import "./index.scss";

export default function UserContextProvider(props) {
    const [loggedInUsers, setLoggedInUsers] = useState([
        //{id: '123', username: 'diabla'}, {id: '456', username: 'bardot'}
    ]);
    console.log(loggedInUsers)
    useEffect(()=> {
            async function getUsers() {
                try {
                    const response = await axios.get('api/users')
                    console.log(response.data)
                    setLoggedInUsers([response.data])
                }
                catch(err) {
                    console.log(err)
                }
            }
          
            getUsers(); 
          },[])
  return (
        <UserContext.Provider value={{loggedInUsers}}>
            {props.children}
        </UserContext.Provider>
  )
}


