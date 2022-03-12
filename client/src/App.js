import './index.scss';
import React, {useState, useEffect} from 'react'
import Home from './components/Home'
import CreateLogin from './components/CreateLogin'
import Chat from './components/Chat.js'
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button'
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const App = () => {

const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem('userId'))
const [theme, setTheme] = useState('light')

function handleClickLight() {
  setTheme("light")
}

function handleClickDark() {
  setTheme("dark")
}

  return (
    <div 
      className="App"
      style={{backgroundColor: theme === "light" ? "white" : "#02024b"}}
      
    >  
  <Button 
    variant="outline-light"
    onClick={handleClickLight}
    >
      🌞
  </Button>
  <Button 
    variant="outline-light"
    onClick={handleClickDark}
    >
      🌜
  </Button>

    <BrowserRouter>
    <Switch>
        <Route 
          path="/chat"
          render={()=>{
            return loggedInUser ? (
              <Chat setIsLoggedIn={loggedInUser} theme={theme}/>
              ) : (
              <Redirect to= "/" />
              );
            }}
          />

        <Route 
          exact path="/createlogin" 
          render={() => <CreateLogin theme={theme} />} 
        />

        <Route 
          exact path="/" 
          render={()=>{
              return loggedInUser ? (
                <Redirect to="/chat"/>
              ) : (
                <Home setIsLoggedIn={loggedInUser} theme={theme}/>
              );
            }} 
          />
      
      </Switch>
  </BrowserRouter>,
  
    </div>
  );
}

export default App;

