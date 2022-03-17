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

//const storedUserID = localStorage.getItem('userId');

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
    variant="outline-warning"
    onClick={handleClickLight}
    style={{borderRadius: "49%",
            margin: ".3em"
    }}
    >
      🌞
  </Button>

  <Button 
    variant="outline-warning"
    onClick={handleClickDark}
    style={{borderRadius: "49%",
            margin: ".3em"
          }}
    >
      🌜
  </Button>

    <BrowserRouter>
    <Switch>
        <Route 
          path="/chat"
          render={()=>{
            return localStorage.getItem('userId') ? (
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
              return localStorage.getItem('userId') ? ( //localStorage.getItem('userId')
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

