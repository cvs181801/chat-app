import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Chat from './components/Chat';
import CreateLogin from './components/CreateLogin'

import 'bootstrap/dist/css/bootstrap.css';
import {UserContext} from './contexts/UserContext'

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
  
);


