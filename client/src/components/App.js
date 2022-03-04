//import '../src/index.css';
import React, {useState, useEffect} from 'react'
import Home from './Home.js'
import Chat from './Chat.js'
import UserContext from '../contexts/UserContext'


function App() {
  return (
    <div className="App">
      <UserContext.Provider>
        <Home/>
      </UserContext.Provider>
       
      
    </div>
  );
}

export default App;
