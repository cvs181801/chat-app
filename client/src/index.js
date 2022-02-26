import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Chat from './Chat';
import CreateLogin from './CreateLogin';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <BrowserRouter>
  <React.StrictMode>
      <Routes>
        <Route path="/createlogin" element={<CreateLogin />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/" element={<App />} />
      </Routes> 
  </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
  
);


