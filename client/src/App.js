import './index.scss';
import React, {useState, useEffect} from 'react'
import Home from './components/Home'
import CreateLogin from './components/CreateLogin'
import Chat from './components/Chat.js'
import 'bootstrap/dist/css/bootstrap.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const App = () => {

const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem('userId'))

  return (
    <div className="App">     
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

  
    </div>
  );
}

export default App;

