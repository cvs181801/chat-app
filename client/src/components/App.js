//import '../src/index.css';
import React, {useState, useEffect} from 'react'
import Home from './Home'
import Chat from './Chat.js'
import UserContext from '../contexts/UserContext'
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="App">     
        <Home/>
    </div>
  );
}

export default App;
