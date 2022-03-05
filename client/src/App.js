import './index.css';
import React, {useState, useEffect} from 'react'
import Home from './components/Home'
import CreateLogin from './components/CreateLogin'
import Chat from './components/Chat.js'
//import UserContext from '../contexts/UserContext'
import 'bootstrap/dist/css/bootstrap.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const App = () => {

const [isLoggedIn, setIsLoggedIn] = useState(false)


  return (
    <div className="App">     
    <BrowserRouter>
    <Switch>
        <Route 
          path="/chat"
          render={()=>{
            return isLoggedIn ? (
              <Chat setIsLoggedIn={setIsLoggedIn} />
              ) : (
              <Redirect to= "/" />
              );
            }}
          />

        <Route 
          path="/createlogin" 
          element={<CreateLogin />} 
        />

        <Route 
          exact path="/" 
          render={()=>{
              return isLoggedIn ? (
                <Redirect to="/chat"/>
              ) : (
                <Home setIsLoggedIn={setIsLoggedIn}/>
              );
            }} 
          />
      
      </Switch>
  </BrowserRouter>,
    </div>
  );
}

export default App;

