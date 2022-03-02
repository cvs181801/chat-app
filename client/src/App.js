import './index.css';
import React from 'react'
import Home from './Home.js'
import Chat from './Chat.js'
import Context from './Context'


function App() {
  return (
    <div className="App">
      <Context.Provider value ={[]}>
        <Home/>
      </Context.Provider>
    </div>
  );
}

export default App;
