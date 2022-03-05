import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Chat from './components/Chat';
import CreateLogin from './components/CreateLogin'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import {UserContext} from './contexts/UserContext'

ReactDOM.render(
  <BrowserRouter>
  <React.StrictMode>
  {/* <UserContext> */}
      <Routes>
        <Route path="/createlogin" element={<CreateLogin />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/" element={<App />} />
        
      </Routes>
      {/* </UserContext>  */}
      
  </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
  
);


