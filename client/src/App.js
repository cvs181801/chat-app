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
import { ThemeContext } from './contexts/ThemeContext';

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
      style={{backgroundColor: theme === "light" ? "white" : "black"}}
      
    >  
  <Button 
    variant="outline-light"
    onClick={handleClickLight}
    >
      🌞
  </Button>
  <Button 
    variant="outline-dark"
    onClick={handleClickDark}
    >
      🌜
  </Button>

    <ThemeContext.Provider value={theme}>
    <BrowserRouter>
    <Switch>
        <Route 
          path="/chat"
          render={()=>{
            return loggedInUser ? (
              <Chat setIsLoggedIn={loggedInUser} />
              ) : (
              <Redirect to= "/" />
              );
            }}
          />

        {/* <Route 
          exact path="/chat" 
          render={() => <Chat />} 
        /> */}

        <Route 
          exact path="/createlogin" 
          render={() => <CreateLogin />} 
        />

        <Route 
          exact path="/" 
          render={()=>{
              return loggedInUser ? (
                <Redirect to="/chat"/>
              ) : (
                <Home setIsLoggedIn={loggedInUser}/>
              );
            }} 
          />
      
      </Switch>
  </BrowserRouter>,
  </ThemeContext.Provider>   
  
    </div>
  );
}

export default App;

