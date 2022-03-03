import './index.css';
import React, {useState, useEffect} from 'react'
import Home from './Home.js'
import Chat from './Chat.js'
import Context from './Context'

function App() {

  const [loggedInUsers, setLoggedInUsers] = useState([])

useEffect(()=>{
  async function getUsers() {
      try {
          const response = await axios.get('api/users')
          console.log(response.data)
          setLoggedInUsers([response.data.username])
      }
      catch(err) {
          console.log(err)
      }
  }

  getUsers(); 
},[])

  return (
    <div className="App">
      <Context.Provider value={[loggedInUsers]}>
        <Home/>
      </Context.Provider>  
    </div>
  );
}

export default App;
